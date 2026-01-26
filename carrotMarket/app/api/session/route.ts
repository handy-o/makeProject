// import { NextResponse } from 'next/server';
// import { getIronSession } from 'iron-session';

// interface SessionContent {
//     id?: number; 
// }

// // API 라우트에서 GET 요청 처리
// export async function GET(req: Request) {
//     // Next.js의 Response 객체 생성
//     const res = NextResponse.next();

//     // getIronSession을 호출하여 세션을 가져옵니다.
//     const session = await getIronSession<SessionContent>(req, res, {
//         cookieName: "merry_chrestmas",
//         password: process.env.COOKIE_PASSWORD!,
//         cookieOptions: {
//             secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서 HTTPS 사용 시 true
//         },
//     });

//     return NextResponse.json({ userId: session.id });
// }


import { NextResponse } from 'next/server';
import getSession from "../../../lib/session"

export async function GET(req: Request) {
    const session = await getSession(req); // 요청 객체를 전달하여 세션 가져오기
    return NextResponse.json({ userId: session.id });
}