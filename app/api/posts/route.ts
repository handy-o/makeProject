import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [results] = await db.query('SELECT * FROM dd_post ORDER BY created_at DESC')
        // console.log("dd_post DB 데이터 가져오기 성공:", results);
        return NextResponse.json(results);
    } catch(error) {
        console.error("dd_post DB 에러 발생:", error); // 에러가 난다면 여기에 이유가 찍힙니다.
        return NextResponse.json({error:'dd_post DB연결 실패'}, {status: 500})
    }
}

// import { NextResponse, NextRequest } from 'next/server';
// import db from '@/lib/db';

// const postService = {
//     getAll: async() => {
//         return await db.query('SELECT * FROM dd_post ORDER BY created_at DESC')
//     },
//     getByKeyword: async(keyword: string) => {
//         return await db.query(
//             'SELECT * FROM dd_post WHERE title LIKE ? OR content LIKE ? ORDER BY created_at DESC',
//             [`%${keyword}%`, `%${keyword}%`]
//         );
//     }
// }

// export async function GET(request: NextRequest) {
//     const {searchParams}  = new URL(request.url)
//     const keyword = searchParams.get('search');

//     let results;
//     try {
//         if (keyword) {
//             [results] = await postService.getByKeyword(keyword);
//         } else {
//             [results] = await postService.getAll();
//         }
//         // const [results] = await db.query('SELECT * FROM dd_post ORDER BY created_at DESC')    
//         // console.log("dd_post DB 데이터 가져오기 성공:", results);
//         return NextResponse.json(results);
//     } catch(error) {
//         console.error("dd_post DB 에러 발생:", error); // 에러가 난다면 여기에 이유가 찍힙니다.
//         return NextResponse.json({error:'dd_post DB연결 실패'}, {status: 500})
//     }
// }
