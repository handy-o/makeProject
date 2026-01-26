// import { NextResponse } from 'next/server';
// import db from '../../../lib/db'; // DB 연결 import
// import getSession from '../../../lib/session'; // 세션 가져오기
// import { z } from 'zod';

// const commentSchema = z.object({
//     tweetId: z.number(),
//     comment_txt: z.string().min(1, "댓글을 입력해주세요"),
// });

// export async function POST(req: Request) {
//     const session = await getSession(req);
    
//     if (!session.id) {
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const body = await req.json();
    
//     // 데이터 유효성 검사
//     const result = commentSchema.safeParse(body);
//     if (!result.success) {
//         return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
//     }

//     const { tweetId, comment_txt } = result.data;

//     // DB에 댓글 추가
//     const newComment = await db.comment.create({
//         data: {
//             comment_txt,
//             payload: comment_txt,
//             user: { connect: { id: session.id } },
//             tweet: { connect: { id: tweetId } },
//         },
//         select: { id: true, comment_txt: true, userId: true }, // 필요한 필드 선택
//     });

//     return NextResponse.json(newComment);
// }

import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import getSession from '../../../lib/session'; // 세션 가져오기

export async function POST(req: NextRequest) {
    const session = await getSession(req);
    try {
        const { tweetId, comment_txt } = await req.json();

        if (!tweetId || !comment_txt) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const newComment = await db.comment.create({
            data: {
                comment_txt,
            payload: comment_txt,
            user: { connect: { id: session.id } },
            tweet: { connect: { id: tweetId } },
            },
        });

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}