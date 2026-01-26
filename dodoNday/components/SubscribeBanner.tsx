import useSubscriptionStore from "@/store";
import { useAuth } from "@/hook/useAuth";
import { useEffect, useState } from "react";

export default function SubscribeBanner() {
    const { updateSubscription } = useAuth()
    const { isSubscribed, toggleSubscription } = useSubscriptionStore()
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isSubscribed === false) {
            setShouldRender(true) // React 19/Next 16에서 추가된 effect 안에서 React state를 직접 바꾸는 패턴을 일반적으로 경계하라
            const timer = setTimeout(() => setIsVisible(true), 60);
            return () => clearTimeout(timer);
        } else if (isSubscribed) {
            setIsVisible(false)
            const timer = setTimeout(() => setShouldRender(false), 700);
            return () => clearTimeout(timer);
        }
    }, [isSubscribed])

    if (isSubscribed === null || (isSubscribed === true && !shouldRender)) {
        return null
    }

    const handleToggleSubscription = async () => {
        const { error } = await updateSubscription(!isSubscribed);
        if (!error) {
            await toggleSubscription(!!isSubscribed, updateSubscription);
            //alert('구독이 완료되었습니다.');
        }
    }

    return (
        // <div className={`overflow-hidden transition-[max-height,opacity] duration-800 delay-300 ease-in-out ${isVisible ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`
            grid transition-[grid-template-rows,opacity] duration-700 ease-in-out
            ${isVisible ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0 mb-0'}
        `}>
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