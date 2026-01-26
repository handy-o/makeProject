"use server";

import {z} from "zod";
import bcrypt from "bcrypt";
import db from "../../lib/db";
import { PASSWORD_MIN_LENGTH } from "../../lib/constants"; 
import getSession from "../../lib/session";
import { redirect } from "next/navigation";

// 이메일은 "@zod.com"만 허용
const checkEmail = (email: string) => email.includes('@zod.com');

// 비번 === 비번확인 검증
const checkPasswords = ({password, password_confirm} : {password:string, password_confirm:string}) => password === password_confirm

// 스키마
const formSchema = z.object({
    username: z.string({
            invalid_type_error: "Username must be a string!",
            required_error: "Where is my Username?"
        }).min(5,"Way too short").max(10, "That's too long!").toLowerCase().trim(),

    email: z.string().email().refine(checkEmail ,"Only @zod.com emails are allowed"),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    password_confirm: z.string().min(PASSWORD_MIN_LENGTH)
})
.superRefine(async ({username}, ctx) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true
        }
    })
    if(user) {
        ctx.addIssue({
            // issue에는 code가 필요
            code: 'custom',
            message: "This username is already exist" ,
            path: ["username"],
            fatal: true // fatal과 NEVER이 있으면 다른 refine이 있어도, 멈추고 더 실행되지않음
        })
        return z.NEVER;
    }
})
.superRefine(async ({email}, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    })
    if(user) {
        ctx.addIssue({
            code: 'custom',
            message: "This email is already exist" ,
            path: ["email"],
            fatal: true 
        })
        return z.NEVER;
    }
})
.refine(checkPasswords, {
    message : "Both passwords should be the same!",
    path: ["password_confirm"]
})

export async function createAccount(prevState:any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirm: formData.get("password_confirm"),
    }

    const result = await formSchema.safeParseAsync(data);
    if(!result.success) {
        return {
            data: data, // To maintain form tag text initialization in NextJS15 version => defaultValue
            errors: result.error.flatten()
        };
    } else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        const user = await db.user.create({
            data : {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select :{  
                id: true
            }
        })

        const session = await getSession()
        session.id = user.id 
        await session.save() 
        redirect("/profile");
    }
}