'use client'
import { useEffect, useState } from "react"
import { FastAverageColor } from "fast-average-color"

export default function AverageColor({
    src,
    children
}: {
    src: string;
    children: (bgColor: string) => React.ReactNode
}) {
    const [bgColor, setBgColor] = useState<string>('#fff');

    useEffect(() => {
        const fac = new FastAverageColor();
        fac.getColorAsync(src)
            .then(res => setBgColor(res.hex))
            .catch(() => setBgColor('#ffffff'))
        return () => fac.destroy();
    }, [src])

    return <>{children(bgColor)}</>
}