// 옵션
// Next.js 서버 API 핸들러

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const Handlers = {
  main: async () => await supabase.from('dd_post').select('*').limit(5),
  tag: async (val: string) => await supabase.from('dd_post').select('*').contains('tags', [val]),
  search: async (val: string) => await supabase.from('dd_post').select('*').eq('id', `%${val}%`),
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
