'use client'

import { useAuth } from "@/hook/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useSubscriptionStore from "@/store"
import { useToggleSubscription } from "@/hook/useToggleSubscription"

export default function Subscribe() {
    const { user, signOut } = useAuth()
    const { isSubscribed, toggleSubscription } = useToggleSubscription()
    const [localLoding, setLocalLoading] = useState(false)
    const router = useRouter()

    // const isSubscribed = user?.is_subscribed ?? false
    const { setSubscription } = useSubscriptionStore(); // 처음 로그인 정보를 불러왔을 때 스토어에 넣기 위해
    useEffect(() => {
        if (user !== undefined) {
            setSubscription(user?.is_subscribed ?? null)
        }
    }, [user, setSubscription])

    const handleToggleSubscription = async () => {
        if (!user || isSubscribed === null) {
            alert('로그인이 필요합니다')
            router.push('/login') // alert 확인 후 로그인 페이지로 이동
            return
        }
        const { error } = await toggleSubscription()
        alert(error ? '처리 중 오류가 발생했습니다.' : '처리되었습니다.')
    }

    // 실수로 누르지 않도록 한 번 더 확인
    const handleSignOut = async () => {
        if (!confirm('로그아웃 하시겠어요?')) return
        await signOut()
    }

    return (
        <>
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

        {/* 로그인했을 때만 하단에 작게 표시 */}
        {user && (
            <p className="mb-8 text-center text-[11px] text-neutral-400">
                {user.name ?? user.email}님
                <span className="mx-1.5">·</span>
                <button type="button" onClick={handleSignOut} className="underline underline-offset-2 hover:text-neutral-600">
                    로그아웃
                </button>
            </p>
        )}
        </>
    )
}