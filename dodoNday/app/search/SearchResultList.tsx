'use client'
import { useEffect, useState } from "react"
import { Post } from "@/lib/supabase"
import PostList from "@/components/PostList"
import { getPostSearchKeyword } from "@/lib/dbApi";


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
            const { data, error } = await getPostSearchKeyword(query)

            if (!error && data) {
                setResults(data);
            } else {
                console.error("검색 에러:", error.message);
            }
            setLoading(false)
        }
        fetchPosts();
    }, [query])

    // 안내 문구 공통 스타일
    const message = (text: string) => (
        <p className="py-20 text-center text-sm text-neutral-400">{text}</p>
    )

    if (loading) return message('검색 중...')
    if (query.length < 2) return message('최소 2글자 이상 입력해주세요')
    if (results.length === 0) return message('검색 결과가 없습니다 🥲')

    return (
        <>
            <p className="text-xs text-neutral-500 mb-4">총 {results.length}건</p>
            <PostList posts={results} />
        </>
    )
}