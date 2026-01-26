import { useEffect, useState } from "react"
import { FastAverageColor } from "fast-average-color"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import 'swiper/css'
import '../styles/sliderStyle.css'
import Link from "next/link"

interface CardProps {
  type: string;
  items: { id: string, title: string; thumbnail: string, link?: string, extra?: React.ReactNode }[];
  loading: boolean;
}
export default function CardSlider({ type, items, loading }: CardProps) {
  return (
    // <div className={`sliderComp slider-${type}`}>
    //     {items.map()}
    // </div>
    <div className={`sliderComp slider-${type} aspect-350/160 w-full ${loading ? 'bg-gray-50' : '#fff'}`}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1.14}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 30000, disableOnInteraction: false }}
      >
        {items.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="card"
            aria-label={`슬라이드 ${idx + 1} / ${items.length}`}
          >

            <Link href={`/donday/${item.id}`}>
              <ColorSlide title={item.title} thumbnail={item.thumbnail} extra={item.extra} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

async function CardSliderContent() {

}

// 각 이미지마다 색 계산
function ColorSlide({ title, thumbnail, extra }: { title: string; thumbnail: string; extra: React.ReactNode }) {
  const [bgColor, setBgColor] = useState<string>('#fff');
  useEffect(() => {
    const fac = new FastAverageColor()

    const getColor = async () => {
      try {
        const color = await fac.getColorAsync(thumbnail)
        setBgColor(color.hex)
      } catch (err) {
        setBgColor('#fff')
        console.error("색상 추출 실패:", thumbnail, err)
      }
    }

    getColor()
    return () => fac.destroy()
  }, [thumbnail])

  // useEffect(() => {
  // }, [bgColor])

  return (
    <>
      <div className="bgImg"
        style={{
          display: 'flex',
          width: `100%`, height: `100%`,
          borderRadius: '8px',
        }}>
        <img src={thumbnail} alt="" />
      </div>

      <div className="bgGrd"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor}00, ${bgColor}FF)`,
          overflow: 'hidden',
          textAlign: 'center',
          transition: 'background-color 0.4s ease',
        }}>
        <p className="text-left">{title}</p>
        {extra && <div className="extra">{extra}</div>}
      </div>
    </>
  );
}