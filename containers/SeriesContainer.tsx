import { useEffect, useState } from "react";
import CardSlider from "@/components/CardSlider";

export default function SeriesContainer() {
    const [post, setPosts] = useState([]);
    useEffect(() => {

    })

    const posts = [
        {title: "1번 오리지널", img:'https://cdn.pixabay.com/photo/2022/02/18/12/48/blue-whale-drawing-7020598_1280.png'},
        {title: "2번 땅땅뉴스", img:'https://cdn.pixabay.com/photo/2025/06/26/04/23/cat-9681126_1280.png'},
        {title: "3번 예금과 주식", img:'https://cdn.pixabay.com/photo/2025/06/26/04/23/colloseum-9681139_1280.png'},
        {title: "4번 코인위키", img:'https://cdn.pixabay.com/photo/2025/06/26/04/22/nature-9681112_1280.png'}
    ];
    return (
        <CardSlider type="originlSeries" items={posts} />
    )
}