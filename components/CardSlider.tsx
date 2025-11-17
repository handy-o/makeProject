import { useEffect, useRef, useMemo, useState } from "react"
import { FastAverageColor } from "fast-average-color"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import 'swiper/css'
import '../styles/sliderStyle.css'

interface CardProps {
    type: string;
    items:  { title: string; img: string, link?: string, extra?: React.ReactNode }[];
}
export default function CardSlider({type, items}: CardProps) {
    return (
        // <div className={`sliderComp slider-${type}`}>
        //     {items.map()}
        // </div>
        <div className={`sliderComp slider-${type}`}>
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
                        <ColorSlide title={item.title} img={item.img} extra={item.extra} />
                        
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

// ★ 각 이미지마다 색 계산
function ColorSlide({ title, img, extra }: { title: string; img: string; extra:React.ReactNode }) {
    const [bgColor, setBgColor] = useState<string>('#fff');
    useEffect(() => {
        const fac = new FastAverageColor()
    
        const getColor = async () => {
          try {
            const color = await fac.getColorAsync(img)
            setBgColor(color.hex)
          } catch (err) {
            console.error("색상 추출 실패:", img, err)
          }
        }
    
        getColor()
        return () => fac.destroy()
      }, [img])

      useEffect(() => {
      }, [bgColor])
  
    return (
      <>
        <div className="bgImg"
            style={{
            display:'flex',
            width:`100%`, height: `100%`,
            borderRadius: '8px',
          }}>
            <img src={img} alt="" />
        </div>
        
        <div className="bgGrd"
            style={{
                backgroundImage: `linear-gradient(to bottom, ${bgColor}00, ${bgColor}FF)`,
                overflow: 'hidden',
                textAlign: 'center',
                transition: 'background-color 0.4s ease',
              }}>
                <p>{title}</p>
                {extra && <div className="extra">{extra}</div>}
        </div>
       
      </>
    );
}