import {create} from 'zustand'

// 구독 상태만 보관 (DB 업데이트는 useAuth의 updateSubscription이 담당)
interface SubscriptionState {
    isSubscribed: boolean | null;
    isLoading: boolean;
    setSubscription: (status: boolean | null) => void;
}

const useSubscriptionStore = create<SubscriptionState>((set) => ({
    isSubscribed: null,
    isLoading: true,

    // DB에서 가져온 값 / 변경에 성공한 값으로 상태를 업데이트
    setSubscription: (status) => set({ isSubscribed: status, isLoading: false}),
}))

export default useSubscriptionStore;
