"use server";

import db from "../../../lib/db";
import getSession from "../../../lib/session";
import { revalidateTag } from "next/cache";

export async function likePost(tweetId: number) {
    // 임시 딜레이
    // await new Promise((r) => setTimeout(r, 10000));
  
  const session = await getSession();
  if (!session || !session.id) {
    throw new Error("User session is invalid");
  }
  
  try {
    // 데이터 객체에서 tweetId와 userId를 명확히 지정
    await db.like.create({
      data: {
        token: `${session.id}-${tweetId}`, // 고유한 토큰 생성
        tweetId: tweetId, // tweetId가 number 타입으로 전달
        userId: session.id!, // session.id가 number 타입이어야 함
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.error(e); // 에러 로그 추가
  }
}

export async function dislikePost(tweetId: number) {
  // 임시 딜레이
  // await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  
  try {
    // 복합 기본키로 사용되는 tweetId와 userId를 명확히 전달
    await db.like.delete({
        where: {
            id: {
              tweetId,
              userId: session.id!,
            },
        },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.error(e); // 에러 로그 추가
  }
}