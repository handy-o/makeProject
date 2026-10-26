'use client'

import SubscribeBanner from "@/components/SubscribeBanner";
import Title from "@/components/Title";
import BannerContainers from "@/containers/BannerContainer";
import CategoriesContainer from "@/containers/CategoriesContainer";
import KeywordsContainer from "@/containers/KeywordsContainer";
import SeriesContainer from "@/containers/SeriesContainer";
import Subscribe from "@/containers/Subscribe";
import TopSharedContainer from "@/containers/TopSharedContainer";
import { useScrollRestore } from "@/hook/useScrollRestore";

export default function Home() {
    // 시리즈·글 목록 등으로 갔다가 돌아오면 보고 있던 위치로 복원
    useScrollRestore('home')

    return (
        <div className="flex items-center justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col max-w-[400px] bg-white min-h-screen">
                <SubscribeBanner />

                <Title title="공유수TOP콘텐츠" subTitle="이것만은 꼭!" />
                <TopSharedContainer />

                <Title title="주제별 콘텐츠" subTitle="관심사로 모아보는" />
                <CategoriesContainer />

                <BannerContainers />

                <Title title="추천 키워드" subTitle="사람들이 많이 찾는" />
                <KeywordsContainer />

                <Title title="오리지널 시리즈" subTitle="오직 여기에서!" />
                <SeriesContainer />

                <Subscribe />
            </main>
        </div>
    )
}
