import { useEffect, useRef, useState } from "react";
import CardSlider from "@/components/CardSlider";



export default function TopSharedContainer() {
    const [post, setPosts] = useState([]);

    const posts = [
        {title: "1번째 카드", img:'https://cdn.pixabay.com/photo/2022/02/18/12/48/blue-whale-drawing-7020598_1280.png'},
        {title: "2번째 부동산 대책\n효과 있을까?", img:'https://cdn.pixabay.com/photo/2025/06/26/04/23/cat-9681126_1280.png'},
        {title: "3번째 카드", img:'https://cdn.pixabay.com/photo/2025/06/26/04/23/colloseum-9681139_1280.png'},
        {title: "4번째 카드", img:'https://cdn.pixabay.com/photo/2025/06/26/04/22/nature-9681112_1280.png'}
    ];
    return (
        <CardSlider type="topShared" items={posts} />
    )
}