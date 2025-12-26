'use client'

import { useAuth } from "@/hook/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useSubscriptionStore from "@/store"

export default function Subscribe() {
    const { user, updateSubscription } = useAuth()
    const [localLoding, setLocalLoading] = useState(false)
    const router = useRouter()

    // const isSubscribed = user?.is_subscribed ?? false
    const { isSubscribed, setSubscription, toggleSubscription } = useSubscriptionStore(); // Zustand 스토어에서 구조분해로 두 변수 꺼내겠다
    useEffect(() => {
        if (user !== undefined) {
            setSubscription(user?.is_subscribed ?? null)
        }
    }, [user, setSubscription])

    // const handleToggleSubscription = async () => {
    //     if (!user) {
    //         alert('로그인이 필요합니다')
    //         return // router.push('/login')
    //     }

    //     // 서버 업데이트
    //     const currentStatus = isSubscribed; //zustand
    //     const newStatus = !currentStatus;
    //     const { error } = await updateSubscription(newStatus)

    //     if (error) {
    //         alert(`구독 상태 변경 실패: ${error.message}`)
    //     } else {
    //         alert(`${newStatus ? '구독이' : '구독취소가'} 완료되었습니다.`)
    //         // 여기서 상태값 바꿔주는 코드 잇어야 하는거 아냐?
    //     }
    //     setLocalLoading(false)
    // }

    const handleToggleSubscription = async () => {
        if (!user || isSubscribed === null) {
            alert('로그인이 필요합니다')
            return // router.push('/login')
        }
        const { error } = await updateSubscription(!isSubscribed);
        if (!error) {
            // 2. 성공했으니 이제 스토어에 있는 함수를 써먹는다!
            toggleSubscription(isSubscribed, updateSubscription);
            alert('처리되었습니다.');
        }
    }
    return (
        <div className="subscribe-wrap flex justify-between m-6 mt-10">
            <div className="description">
                <h5 className="text-sm font-bold mb-2">돈이 되는 이야기</h5>
                <p className="text-xs w-[130px]">돈이 되는 똑똑한 습관을 만들고 싶다면?</p>
            </div>
            <div className="btn-subsc">
                <button
                    className={`rounded-sm bg-[#21252b] text-white py-2 px-3 text-sm
                        ${isSubscribed
                            ? 'bg-red-500 text-white hover:bg-red-600' // 구독 중
                            : 'bg-green-500 text-white hover:bg-green-600' // 구독 안 함
                        }
                    `}
                    onClick={handleToggleSubscription}
                    disabled={localLoding}
                >
                    {isSubscribed ? '구독 취소하기' : '구독하기'}
                </button>
            </div>
        </div>
    )
}