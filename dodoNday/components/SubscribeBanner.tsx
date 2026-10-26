import useSubscriptionStore from "@/store";
import { useToggleSubscription } from "@/hook/useToggleSubscription";
import { useEffect, useRef, useState } from "react";

export default function SubscribeBanner() {
    const { isSubscribed, toggleSubscription } = useToggleSubscription()
    const ref = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false) // 배너를 펼쳤는지

    useEffect(() => {
        const el = ref.current
        if (!el) return
        let inView = false // 배너 자리가 지금 화면에 보이는지

        // "구독 전" + "화면에 보임" 두 조건이 모두 맞는 순간에만 펼침
        // → 한 번 펼치면 아래로 스크롤해도 접지 않음 (내용이 위로 튀지 않게)
        const tryOpen = () => {
            const { isSubscribed } = useSubscriptionStore.getState()
            if (inView && isSubscribed === false) setIsOpen(true)
        }

        // 배너 자리가 화면에 들어오고 나갈 때마다 inView 갱신
        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting
            tryOpen()
        })
        observer.observe(el)

        // 구독 상태가 바뀔 때: 구독하면 접고, 구독 취소하면 화면에 보일 때만 펼침
        const unsubscribe = useSubscriptionStore.subscribe((state) => {
            if (state.isSubscribed) setIsOpen(false)
            else tryOpen()
        })

        return () => {
            observer.disconnect()
            unsubscribe()
        }
    }, [])

    // 구독 전이고, 펼친 상태일 때만 보임
    const isVisible = isSubscribed === false && isOpen

    const handleToggleSubscription = async () => {
        const { error } = await toggleSubscription()
        if (error) alert('처리 중 오류가 발생했습니다.')
    }

    return (
        // 펼침/접힘: grid-rows 1fr ↔ 0fr 전환으로 높이 애니메이션
        // 로그인 전에도 접힌 상태로 자리는 그려 둠 → 화면에 들어왔는지 관찰하기 위해
        // 접혀 있을 때는 inert 로 버튼에 포커스·클릭이 가지 않게 함
        <div
            ref={ref}
            inert={!isVisible}
            className={`
                grid transition-[grid-template-rows,opacity] duration-700 ease-in-out
                ${isVisible ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0 mb-0'}
            `}
        >
            <div className="overflow-hidden">
                <div className="bg-blue-500 text-white p-4 text-center">
                    <p>아직 구독 전이신가요? 지금 구독해보세요! 🚀</p>
                    <button
                        onClick={handleToggleSubscription}
                        className="mt-2 bg-white text-blue-500 px-4 py-1 rounded-full text-sm font-bold"
                    >
                        구독하기
                    </button>
                </div>
            </div>
        </div>
    )
}
