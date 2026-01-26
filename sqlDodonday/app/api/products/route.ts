import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [results] = await db.query('SELECT * FROM dd_products WHERE is_active = 1 ORDER BY created_at DESC')
        // console.log("dd_products DB 데이터 가져오기 성공:", results);
        return NextResponse.json(results);
    } catch(error) {
        console.error("dd_products DB 에러 발생:", error);
        return NextResponse.json({error:'dd_products DB연결 실패'}, {status: 500})
    }
}