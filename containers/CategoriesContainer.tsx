import { useState, useEffect } from "react"
import Categories from "@/components/Categories"

const mockList = [
    { key: 'latest', name: '최신' },
    { key: 'saving', name: '저축' },
    { key: 'realestate', name: '부동산' },
    { key: 'loan', name: '대출' },
    { key: 'life', name: '생활' },        // ✅ 데이터 없는 카테고리도 포함
    { key: 'common', name: '상식' },
    { key: 'news', name: '뉴스' },
    { key: 'invest', name: '투자' },
] as const

const mockData = {
    latest: [
        { title: "고강도 부동산 대책, 효과 있을까?", img: "https://cdn.pixabay.com/photo/2024/11/02/19/08/bird-9169969_1280.jpg" },
        { title: "식탁 물가가 오르고 있어요", img: "https://cdn.pixabay.com/photo/2022/10/06/08/54/drawing-7502248_1280.jpg" },
    ],
    saving: [
        { title: "적금 금리 비교 꿀팁", img: "https://cdn.pixabay.com/photo/2025/03/11/09/19/money-7658983_1280.jpg" },
    ],
    realestate: [
        { title: "부동산 매매량, 작년 대비 30% 감소", img: "https://cdn.pixabay.com/photo/2023/01/11/18/26/bird-7712475_1280.jpg" },
    ],
    loan: [
        { title: "대출출", img: "https://cdn.pixabay.com/photo/2023/01/11/17/29/bird-7712374_1280.jpg" },
        { title: "대출 출출", img: "https://cdn.pixabay.com/photo/2023/05/13/20/01/toucan-7991337_1280.jpg" }
    ]
}


async function fetchData(categoryKey: string) { // 키 = categoryKey
    return new Promise<{ title: string; img: string }[]>((res) => {
        setTimeout(() => {
            const data = (mockData as any)[categoryKey] // mockData에서 해당 key 배열 찾아 담기
            res(Array.isArray(data) ? data : [])
          }, 300)
    })
}

export default function CategoriesContainer() {
    const [activeKey, setActiveKey] = useState<string>("latest") // ✅ string으로 통일
    const [items, setItems] = useState<{ title: string; img: string }[]>([])
    const [cache, setCache] = useState<Record<string, { title: string; img: string }[]>>({}) // ✅ string key

    // 캐시 확인 후 fetch
    const handleTabClick = (key: string) => {
        setActiveKey(key) // UI 활성화 - 선택된 버튼 강조

        // 캐싱 된 경우
        if (cache[key]) {
            setItems(cache[key]!)
            console.log('캐싱되었다')
            return
        }

        // 캐싱 없는 경우 - fetchData(키)함수 재 호출
        fetchData(key).then((data) => {
            setItems(data) // fetchData 결과로 items 업데이트
            console.log('캐싱안되어서 다시 호출출')
            setCache((prev) => ({ ...prev, [key]: data }))
        })
    }
    // 초기화
    useEffect(() => {
        handleTabClick("latest")
    }, [])

    return (
        <Categories
            tabs={mockList as unknown as { key: string; name: string }[]} // ✅ readonly → mutable
            activeKey={activeKey}
            onTabClick={handleTabClick}
            items={items}
        />
    )
}
