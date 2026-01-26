"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "../../../lib/db";
import getSession from "../../../lib/session";
import { redirect } from "next/navigation";


const tweetSchema = z.object({
  contents_img: z.string({
    required_error: "Photo is required",
  }),
  contents_txt: z.string({
    required_error: "Content text is required",
  }),
})

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    contents_img: formData.get("contents_img"),
    contents_txt: formData.get("contents_txt")
  };
  console.log('???????', data);

  if (data.contents_img instanceof File) {
    const photoData = await data.contents_img.arrayBuffer();
    const imgUrl = `./public/${data.contents_img.name}`;

    await fs.appendFile(`./public/${data.contents_img.name}`, Buffer.from(photoData));
    data.contents_img = `/${data.contents_img.name}`;
  }

  const result = tweetSchema.safeParse(data);
  console.log('트윗파서', result)
  if (!result.success) {
    console.log('왜?에러', result.error.flatten())
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      console.log('세션')
      const tweet = await db.tweet.create({
        data: {
          contents_img: result.data.contents_img,
          contents_txt: result.data.contents_txt,
          user: {
            connect: {
              id: session.id,
            },
          },
          token: `tweet-${Date.now()}`, 
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweet/${tweet.id}`);
      //redirect("/products")
    }
  }
}