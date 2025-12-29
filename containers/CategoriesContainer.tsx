import { useState, useEffect } from "react"
import Categories from "@/components/Categories"
import { supabase } from "@/lib/supabase"
import { PostgrestError } from "@supabase/supabase-js"
import Link from "next/link"
import { getPostsByTag } from "@/lib/dbApi"

const mockList = [
    { key: 'latest', name: '최신' },
    { key: 'saving', name: '저축' },
    { key: 'realestate', name: '부동산' },
    { key: 'loan', name: '대출' },
    { key: 'life', name: '생활' },
    { key: 'common', name: '상식' },
    { key: 'news', name: '뉴스' },
    { key: 'invest', name: '투자' },
] as const


export default function CategoriesContainer() {
    const [activeKey, setActiveKey] = useState<string>("latest")
    const [items, setItems] = useState<{ title: string; img: string }[]>([])
    const [cache, setCache] = useState<Record<string, { title: string; img: string }[]>>({})
    const [loading, setLoading] = useState<boolean>(false)

    // 캐시 확인 후 fetch
    const handleTabClick = async (key: string) => {
        setActiveKey(key) // UI 활성화 - 선택된 버튼 강조
        const selectedTab = mockList.find(tab => tab.key === key);
        const categoryName = selectedTab ? selectedTab.name : '최신';

        // 캐싱 된 경우
        if (cache[key]) {
            setItems(cache[key]!)
            console.log('캐싱되었다')
            return
        }

        // 캐시 없으면 Supabase에서 데이터 가져오기
        setLoading(true)
        try {
            console.log('캐싱안되어서 다시 호출')

            const { data: posts, error } = await getPostsByTag(categoryName, key);
            if (error) throw error
            if (posts) {
                // DB의 img_url을 컴포넌트에서 쓰는 img 키로 매핑
                const formattedData = posts.map(item => ({
                    title: item.title,
                    img: item.thumbnail
                }))

                setItems(formattedData)
                setCache((prev) => ({ ...prev, [key]: formattedData }))
            }
        } catch (error: unknown) {
            const pgError = error as PostgrestError;
            console.error("Supabase 에러 상세:", pgError.message, pgError.details, pgError.hint);
            setItems([])
        } finally {
            setLoading(false)
        }
    }
    // 초기화
    useEffect(() => {
        handleTabClick("latest")
    }, [])

    return (
        <div className="categories-wrapper">
            <Categories
                tabs={mockList as unknown as { key: string; name: string }[]}
                activeKey={activeKey}
                onTabClick={handleTabClick}
                items={items}
            />
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link
                    href={`/search?q=${encodeURIComponent(
                        mockList.find(t => t.key === activeKey)?.name || '최신'
                    )}`}
                    style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#f4f4f4',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#333',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}
                >
                    {activeKey === 'latest' ? '최신글 전체보기' : `${mockList.find(t => t.key === activeKey)?.name} 더보기`}
                </Link>
            </div>
        </div>


    )
}
