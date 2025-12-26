// 옵션
// Next.js 서버 API 핸들러

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const Handlers = {
  main: async () => await supabase.from('dd_post').select('*').limit(5),
  tag: async (val: string) => await supabase.from('dd_post').select('*').contains('tags', [val]),
  search: async (val: string) => await supabase.from('dd_post').select('*').ilike('title', `%${val}%`),
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as keyof typeof Handlers
    const value = searchParams.get('value') || ''

    const { data, error } = await Handlers[type](value);
    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ data, error: null });

    // const category = searchParams.get('category')
    // const limit = searchParams.get('limit')
    // const sortBy = searchParams.get('sortBy') || 'created_at'

    // let query = supabase
    //   .from('dd_post')
    //   .select('*')
    //   .order(sortBy, { ascending: false })

    // // 카테고리 필터링
    // if (category && category !== 'latest') {
    //   query = query.eq('category', category)
    // }

    // // 개수 제한
    // if (limit) {
    //   query = query.limit(parseInt(limit))
    // }

    // const { data, error } = await query

    // if (error) {
    //   console.error('Supabase error:', error)
    //   return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    // }

    // return NextResponse.json({ posts: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const getItemsByMain = async () => {
  const res = await fetch('/api/posts?type=main')
  return res.json()
}

export const getItemsByTag = async (tagName: string) => {
  const res = await fetch(`/api/posts?type=tag&value=${tagName}`)
  return res.json()
}

export const getItemsBySearch = async (keyword: string) => {
  const res = await fetch(`/api/posts?type=search&value=${keyword}`)
  return res.json()
}


// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     const {title, category, tags, content, subtitle, thumbnail} = body

//     // 필수 필드 검증
//     if (!title || !category || !content) {
//       return NextResponse.json(
//         {error: '제목, 카테고리, 본문은 필수입니다.'},
//         {status: 400}
//       )
//     }

//     const {data, error} = await supabase
//       .from('dd_post')
//       .insert({
//         title,
//         category,
//         tags: tags || [],
//         content,
//         subtitle: subtitle || '',
//         thumbnail: thumbnail || '',
//       })
//       .select()
//       .single()

//     if (error) {
//       console.error('Supabase error:', error)
//       return NextResponse.json(
//         {error: '게시글 등록에 실패했습니다.'}, 
//         {status: 500}
//       )
//     }

//     return NextResponse.json({post: data}, {status: 201})
//   } catch (error) {
//     console.error('API error:', error)
//     return NextResponse.json(
//       {error: 'Internal server error'}, 
//       {status: 500}
//     )

//   }
// }