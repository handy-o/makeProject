import {create} from 'zustand'

interface SubscriptionState {
    isSubscribed: boolean | null;
    isLoading: boolean;
    setSubscription: (status: boolean | null) => void;
    toggleSubscription: (currentStatus: boolean, updateFn: (status: boolean) => Promise<{error: any} | any>) => Promise<void>;
}
interface UpdateResponse {
  error: { message: string } | null;
}

const useSubscriptionStore = create<SubscriptionState>((set) => ({
    isSubscribed: null,
    isLoading: true,

    // DB에서 가져온 값으로 상태를 업데이트
    setSubscription: (status) => set({ isSubscribed: status, isLoading: false}),

    // 구독 상태 변경
    toggleSubscription: async (currentStatus, updateFn) => {
        const newStatus = !currentStatus;
        const {error} = await updateFn(newStatus);

        if(!error) {
            set({isSubscribed: newStatus})
        } else {
            throw error
        }
    }
}))

export default useSubscriptionStore;