"use client"; // Next.js 13+ app dir에서 필요

import { useEffect, useRef, useState } from "react";
import styles from "../styles/sliderStyle.module.css";

interface CardSliderProps {
  items?: string[]; // 동적 데이터
}

export default function CardSlider({ items = ["1번", "2번", "3번", "4번"] }: CardSliderProps) {
  const slidesContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  // --- 초기화 및 resize ---
  useEffect(() => {
    const updateWidth = () => {
      if (slidesContainerRef.current) {
        const slide = slidesContainerRef.current.children[0] as HTMLElement;
        setSlideWidth(slide.offsetWidth + 20); // margin 포함
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [items]);

  // --- 자동재생 ---
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [currentIndex, slideWidth]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 2000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  // --- 업데이트 transform ---
  useEffect(() => {
    if (!slidesContainerRef.current) return;
    const offset = currentIndex * slideWidth - (slidesContainerRef.current.offsetWidth - slideWidth) / 2;
    slidesContainerRef.current.style.transition = "transform 0.5s ease";
    slidesContainerRef.current.style.transform = `translateX(-${offset}px)`;
    // active 클래스
    Array.from(slidesContainerRef.current.children).forEach((child, i) => {
      child.classList.toggle("active", i === currentIndex);
    });
  }, [currentIndex, slideWidth]);

  // --- 드래그 / 터치 이벤트 ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopAutoplay();
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    slidesContainerRef.current!.style.transition = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const x = e.clientX;
    const delta = x - startXRef.current;
    slidesContainerRef.current!.style.transform = `translateX(${
      -currentIndex * slideWidth + delta + (slidesContainerRef.current!.offsetWidth - slideWidth) / 2
    }px)`;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const x = e.clientX;
    const delta = x - startXRef.current;

    if (delta > slideWidth / 4) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (delta < -slideWidth / 4) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }

    startAutoplay();
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        ref={slidesContainerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {items.map((item, index) => (
          <div key={index} className={styles.slide}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
