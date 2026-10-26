import { useAuth } from "@/hook/useAuth"
import useSubscriptionStore from "@/store"

// 구독&구독 취소 절차를 한 곳에 모은 훅
// store는 훅(useAuth)을 부를 수 없어서, 훅 안에서 DB 업데이트와 상태 변경을 이어 줌
export function useToggleSubscription() {
    const { updateSubscription } = useAuth()                           // DB 담당
    const { isSubscribed, setSubscription } = useSubscriptionStore()   // 상태 담당

    const toggleSubscription = async () => {
        const next = !isSubscribed
        const { error } = await updateSubscription(next)   // 1. DB 먼저 (응답 올 때까지 기다림)
        if (!error) setSubscription(next)                  // 2. 성공했을 때만 상태 변경
        return { error }
    }

    return { isSubscribed, toggleSubscription }
}
