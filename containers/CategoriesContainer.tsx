import { useState, useEffect } from "react"
import Categories from "@/components/Categories"
import { supabase } from "@/lib/supabase"
import { PostgrestError } from "@supabase/supabase-js"
import Link from "next/link"

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

// (구방식)
// const mockData = {
//     latest: [
//         { title: "고강도 부동산 대책, 효과 있을까?", img: "https://cdn.pixabay.com/photo/2024/11/02/19/08/bird-9169969_1280.jpg" },
//         { title: "식탁 물가가 오르고 있어요", img: "https://cdn.pixabay.com/photo/2022/10/06/08/54/drawing-7502248_1280.jpg" },
//     ],
//     saving: [
//         { title: "적금 금리 비교 꿀팁", img: "https://cdn.pixabay.com/photo/2025/03/11/09/19/money-7658983_1280.jpg" },
//     ],
//     realestate: [
//         { title: "부동산 매매량, 작년 대비 30% 감소", img: "https://cdn.pixabay.com/photo/2023/01/11/18/26/bird-7712475_1280.jpg" },
//     ],
//     loan: [
//         { title: "대출출", img: "https://cdn.pixabay.com/photo/2023/01/11/17/29/bird-7712374_1280.jpg" },
//         { title: "대출 출출", img: "https://cdn.pixabay.com/photo/2023/05/13/20/01/toucan-7991337_1280.jpg" }
//     ]
// }
// async function fetchData(categoryKey: string) { // 키 = categoryKey
//     return new Promise<{ title: string; img: string }[]>((res) => {
//         setTimeout(() => {
//             const data = (mockData as any)[categoryKey] // mockData에서 해당 key 배열 찾아 담기
//             res(Array.isArray(data) ? data : [])
//         }, 300)
//     })
// }

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

        // (구방식) 캐싱 없는 경우 - fetchData(키)함수 재 호출
        // fetchData(key).then((data) => {
        //     setItems(data) // fetchData 결과로 items 업데이트
        //     console.log('캐싱안되어서 다시 호출')
        //     setCache((prev) => ({ ...prev, [key]: data }))
        // })

        // 캐시 없으면 Supabase에서 데이터 가져오기
        setLoading(true)
        try {
            console.log('캐싱안되어서 다시 호출')
            // 'posts' 테이블에서 해당 카테고리의 데이터를 가져오는 쿼리
            // 최신(latest)인 경우 전체를 가져오거나 별도 로직 적용 가능
            let query = supabase
                .from('dd_post') // 테이블 명
                .select('title, thumbnail') // 가져올 컬럼 (img_url은 DB 컬럼명에 맞춰 수정)

            if (key !== 'latest') {
                query = query.ilike('category', `%${categoryName}%`);
            }

            const { data, error } = await query.order('created_at', { ascending: false }).limit(3)

            if (error) throw error

            if (data) {
                // DB의 img_url을 컴포넌트에서 쓰는 img 키로 매핑
                const formattedData = data.map(item => ({
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
