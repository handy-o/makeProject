import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('search');

    // 검색어가 없는 경우 처리 (빈 배열 반환 또는 400 에러 중 선택)
    if (!keyword) {
        return NextResponse.json([]); 
    }

    try {
        // postService 호출 대신 직접 쿼리 수행
        const [results] = await db.query(
            'SELECT * FROM dd_post WHERE title LIKE ? OR content LIKE ? ORDER BY created_at DESC',
            [`%${keyword}%`, `%${keyword}%`]
        );

        return NextResponse.json(results);
    } catch (error) {
        console.error("검색 중 DB 에러 발생:", error);
        return NextResponse.json(
            { error: '데이터베이스 검색에 실패했습니다.' }, 
            { status: 500 }
        );
    }
}