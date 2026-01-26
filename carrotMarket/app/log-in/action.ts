"use server";

import {z} from "zod";
import { PASSWORD_MIN_LENGTH } from "../../lib/constants"; 
import db from "../../lib/db";
import getSession from "../../lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

// 이메일은 "@zod.com"만 허용
const checkEmail = (email: string) => email.includes('@zod.com');

// 비밀번호는 반드시 1개 이상의 숫자 포함
const passwordRegex = new RegExp(
  /^(?=.*[0-9]).+$/
);

const checkEmailExists = async (email:string) => {
  const user = await db.user.findUnique({
    where: {
      email: email
    },
    select: {
      id: true
    }
  })
  return Boolean(user)
}

const formSchema = z.object({
  email: z.string()
          .refine(checkEmail ,"Only @zod.com emails are allowed")
          .refine(checkEmailExists, "이 이메일을 사용하는 계정이 존재하지 않습니다."),
  username: z.string()
              .min(5, "Username should be at least 5 characters long").max(10, "That's too long!").trim(),
  password: z.string()
              .min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
              //.regex(passwordRegex, "Password should contain at least one number (0123456789).")
  })
  

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password")
  }

  const result = await formSchema.spa(data); // safeParseAsync

  if(!result.success) {
    return {
      data: data, // To maintain form tag text initialization in NextJS15 version => defaultValue
      errors: result.error.flatten()
    }
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    })

    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");

    if(ok) {
      // 세션 가져오기
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile")
    } else {
      return {
        fieldErrors : {  // zod인 척 에러 보내기
          password: ["Wrong Password"],
          email: []
        }, 
        data: result.data,
        success: "Welcome back!"
      }
    }
  }
}