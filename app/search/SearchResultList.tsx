'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export interface Post {
    id: string
    title: string
    subtitle?: string
    thumbnail: string
    category: string
    views: number
    shares: number
    tags: string[]
    content?: string
    created_at: string
    updated_at: string
}

export default function SearchResultList({ query }: { query: string }) {
    const [results, setResults] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            if (!query) return; // 검색어가 없으면 실행 안 함
            if (query.length < 2) {
                setResults([]);
                setLoading(false)
                return
            }

            setLoading(true);
            const { data, error } = await supabase
                .from('dd_post')
                .select('*')
                .or(`title.ilike.%${query}%,category.ilike.%${query}%,tags.cs.{${query}}`)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setResults(data);
            } else {
                console.error("검색 에러:", error);
            }
            setLoading(false)
        }
        fetchPosts();
    }, [query])

    if (loading) return <div>검색 중...</div>
    if (query.length < 2) return <div>최소 2글자 이상 입력해주세요</div>
    if (results.length === 0) return <div>결과가 없습니다..</div>

    return (
        <div className="space-y-4">
            {results.map((post) => (
                <div key={post.id} className="p-4 border rounded shadow-sm">
                    <h3 className="font-bold">{post.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                        <div
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />
                    </p>
                </div>
            ))}
        </div>
    )
}