import Link from "next/link";
import { CSSProperties, useEffect, useRef, useState } from "react";

interface KeywordItemProps {
    img: string;
    text: string;
}
interface keywordsRowsProps {
    top: KeywordItemProps[];
    bottom: KeywordItemProps[];
}
interface KeywordsProps {
    items: keywordsRowsProps;
}

export default function Keywords({ items }: KeywordsProps) {
    const trackRefTop = useRef<HTMLUListElement>(null)
    const trackRefBtm = useRef<HTMLUListElement>(null)
    const [durationTop, setDurationTop] = useState<number>(0)
    const [durationBtm, setDurationBtm] = useState<number>(0)
    useEffect(() => {
        if (!trackRefTop.current || !trackRefBtm.current) return;
        const widthTop = trackRefTop.current.offsetWidth / 2;
        setDurationTop(widthTop / 30)

        const widthBtm = trackRefBtm.current.offsetWidth / 2;
        setDurationBtm(widthBtm / 30)
    }, [items])
    return (
        <div className="keywords mb-4 bg-indigo-500 py-4 overflow-hidden">
            <div className="keywords-top keyslide">
                <style jsx>
                    {`
                        .keyslide > .left-ul {--my-ani-left: slideLeft 10s linear infinite;}
                        @keyframes slideLeft {
                            from {transform: translateX(0)}
                            to {transform: translateX(-50%)}
                        }
                        .keyslide > .right-ul {--my-ani-right: slideRight 10s linear infinite;}
                        @keyframes slideRight {
                            from {transform: translateX(-50%)}
                            to {transform: translateX(0%)}
                        }
                    `}
                </style>
                <ul ref={trackRefTop} className="left-ul flex flex-nowrap mb-3 w-max animate-[var(--my-ani-left)]"
                    style={{
                        '--my-ani-left': `slideLeft ${durationTop}s linear infinite`,
                    } as CSSProperties}>
                    {items.top.map((item) => {
                        return (
                            <li key={item.text} className="mr-3">
                                <Link href={`/search?q=${item.text}`} className="flex items-center gap-2 shrink-0 bg-white/60 p-1.5 px-3 rounded-4xl ">
                                    <span className="inline-block w-[30px] h-[30px] bg-white rounded-full overflow-hidden p-1.5">
                                        <img src={item.img} alt="" className="w-100" />
                                    </span>
                                    <span className="text-white text-sm">{item.text}</span>
                                </Link>
                            </li>
                        )
                    })}
                    {items.top.map((item) => {
                        return (
                            <li key={item.text} className="mr-3">
                                <Link href={`/search?q=${item.text}`} className="flex items-center gap-2 shrink-0 bg-white/60 p-1.5 px-3 rounded-4xl ">
                                    <span className="inline-block w-[30px] h-[30px] bg-white rounded-full overflow-hidden p-1.5">
                                        <img src={item.img} alt="" className="w-100" />
                                    </span>
                                    <span className="text-white text-sm">{item.text}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <ul ref={trackRefBtm} className="right-ul flex flex-nowrap w-max animate-[var(--my-ani-right)]"
                    style={{
                        '--my-ani-right': `slideRight ${durationBtm}s linear infinite`,
                    } as CSSProperties}>
                    {items.bottom.map((item) => {
                        return (
                            <li key={item.text} className="mr-3">
                                <Link href={`/search?q=${item.text}`} className="flex items-center gap-2 shrink-0 bg-white/60 p-1.5 px-3 rounded-4xl ">
                                    <span className="inline-block w-[30px] h-[30px] bg-white rounded-full overflow-hidden p-1.5">
                                        <img src={item.img} alt="" className="w-100" />
                                    </span>
                                    <span className="text-white text-sm">{item.text}</span>
                                </Link>
                            </li>
                        )
                    })}
                    {items.bottom.map((item) => {
                        return (
                            <li key={item.text} className="mr-3">
                                <Link href={`/search?q=${item.text}`} className="flex items-center gap-2 shrink-0 bg-white/60 p-1.5 px-3 rounded-4xl ">
                                    <span className="inline-block w-[30px] h-[30px] bg-white rounded-full overflow-hidden p-1.5">
                                        <img src={item.img} alt="" className="w-100" />
                                    </span>
                                    <span className="text-white text-sm">{item.text}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="keywords-bottom keyslide"></div>
        </div>
    )
}