import Banner from "@/components/Banner";
import { useEffect, useState } from "react"

export type BannerItem = {
    subTitle: string;
    title: string;
    icon: string;
    bgColor: string;
    txtColor: string;
};
const mockBanner: BannerItem[] = [
    { subTitle: "모바일쿠폰 할인받아 구매하는", title: "쿠폰 사고팔기", icon: "https://cdn.pixabay.com/photo/2024/11/02/19/08/bird-9169969_1280.jpg", bgColor: "#ea94c5", txtColor: "#000000" },
    { subTitle: "은행 방문 없이 더 낮은 금리로", title: "아낌e 보금자리론", icon: "https://cdn.pixabay.com/photo/2025/06/26/04/23/colloseum-9681139_1280.png", bgColor: "#017a97", txtColor: "#ffffff" },
    { subTitle: "순간마다 남기는 나만의 저축 기록", title: "카카오뱅크 기록통장", icon: "https://cdn.pixabay.com/photo/2023/01/11/17/29/bird-7712374_1280.jpg", bgColor: "#c2a69a", txtColor: "#ffffff" }
]



export default function BannerContainers() {
    const [selectedBanner, setSelectedBanner] = useState<typeof mockBanner[0] | null>(null);

    useEffect(() => {
        const now = new Date();
        const nowKey = now.toISOString().slice(0, 16); // 분단위 "yyyy-mm-ddThh:mm"
        // const nowKey = now.toISOString().split("T")[0]; // 일단위 "yyyy-mm-dd" 

        // 최종적으로 state에 넣을 값을 저장할 변수
        let finalBanner = null;

        try {
            const savedBanner = localStorage.getItem("dailyBanner");

            // 1) 로컬스토리지에 값이 있으면 파싱해서 날짜 비교
            if (savedBanner) {
                const parsed = JSON.parse(savedBanner);
                if (parsed.date === nowKey && parsed.banner) {
                    //console.log("[Banner] 캐시 사용 - 저장된 배너 적용", parsed.banner);
                    finalBanner = parsed.banner;
                }
            }

            // 2) finalBanner 값이 없으면 (캐시 없음 OR 키가 다름) → 랜덤으로 하나 골라서 저장
            if (!finalBanner) {
                const randomBanner = mockBanner[Math.floor(Math.random() * mockBanner.length)];
                const data = { date: nowKey, banner: randomBanner };

                // 3) 로컬스토리지에 저장 후 변수에 반영
                localStorage.setItem("dailyBanner", JSON.stringify(data));
                //console.log("[Banner] 새 배너 저장:", data);
                finalBanner = randomBanner;
            }
        } catch (err) {
            console.error("[Banner] localStorage 처리 중 에러:", err);
            finalBanner = mockBanner[0];
        } finally {
            if (finalBanner) { // 혹시 모를 null/undefined 체크
                setSelectedBanner(finalBanner);
            }
        }
    }, []); // mount 시 1회 실행
    return (
        <Banner banner={selectedBanner} />
    )
}