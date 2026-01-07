'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css'
import SectionTilte from '@/shared/ui/SectionTitle';
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'


import { usePosts } from '../hooks/usePosts';
import Image from 'next/image';

export default function TopBanner() {
    const { posts, isLoading } = usePosts();

    if (isLoading) return <div>데이터 로딩 중... 🚚</div>;
    if (posts.length === 0) return <div>게시글이 없습니다.</div>;

    const tempImg = 'https://cdn.inflearn.com/public/files/posts/0ee179f4-385a-49f5-9da6-bb2089d5ebb9/image.png';

    return (
        <div className="wrap-topBanner">
            <SectionTilte subTitle='이것만은 꼭!' title='조회수 TOP 콘텐츠' />
            <Swiper
                // centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={12}
                slidesOffsetBefore={40}
                loop={true}
                observer={true}
                observeParents={true}
                autoplay={true}
                modules={[Autoplay]}
            >
                {posts.map((post) => (
                    <SwiperSlide key={post.id}
                        className='!w-[75%] aspect-4/3 flex items-center justify-center rounded-2xl text-2xl overflow-hidden'>
                        <Image src={post.thumbnail ?? tempImg}
                            fill
                            className="object-cover"
                            alt="" />
                        {/* <h3 className='absolute bottom-0 z-1 text-xl p-4 [text-stroke:2px_black] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]'>{post.title}</h3> */}
                        <h3 className='absolute bottom-0 z-1 text-xl p-4 text-white font-bold'>{post.title}</h3>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
}