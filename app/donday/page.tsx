'use client'

import Categories from "@/components/Categories";
import Title from "@/components/Title";
import CategoriesContainer from "@/containers/CategoriesContainer";
import SeriesContainer from "@/containers/SeriesContainer";
import TopSharedContainer from "@/containers/TopSharedContainer";

export default function Donday() {
    return (
        <div className="flex items-center justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col max-w-[400px] bg-white min-h-screen">
                <h1>돈데이 메인페이지</h1>

                <Title title="공유수TOP콘텐츠" subTitle="이것만은 꼭!" />
                <TopSharedContainer />

                <Title title="주제별 콘텐츠" subTitle="관심사로 모아보는" />
                <CategoriesContainer/>

                <Title title="오리지널 시리즈" subTitle="오직 여기에서!" />
                <SeriesContainer />

                {/* <img src="https://cdn.pixabay.com/photo/2025/06/26/04/23/cat-9681126_1280.png" alt="" />
                <img src="https://cdn.pixabay.com/photo/2025/06/26/04/23/colloseum-9681139_1280.png" alt="" />
                <img src="https://cdn.pixabay.com/photo/2025/06/26/04/22/nature-9681112_1280.png" alt="" />
                <img src="https://cdn.pixabay.com/photo/2022/02/18/12/48/blue-whale-drawing-7020598_1280.png" alt="" /> */}
            </main>
        </div>
    )
} 