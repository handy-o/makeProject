import { useEffect, useState } from "react";
import CardSlider from "@/components/CardSlider";
import { getSeries } from "@/lib/dbApi";
import { Series } from "@/lib/supabase";

export default function SeriesContainer() {
    const [series, setSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSeries();
    }, [])
    const fetchSeries = async () => {
        try {
            setLoading(true);
            const { data, error } = await getSeries();
            if (error) {
                setError(error.message);
            } else {
                setSeries(data || [])
            }
        } catch (err) {
            setError('시리즈를 불러오는데 실패했습니다.')
            console.error('Error Fetching Series: ', err)
        } finally {
            setLoading(false);
        }
    }

    // const posts = [
    //     { id: '1', title: "1번 오리지널", thumbnail: 'https://cdn.pixabay.com/photo/2022/02/18/12/48/blue-whale-drawing-7020598_1280.png' },
    //     { id: '2', title: "2번 땅땅뉴스", thumbnail: 'https://cdn.pixabay.com/photo/2025/06/26/04/23/cat-9681126_1280.png' },
    //     { id: '3', title: "3번 예금과 주식", thumbnail: 'https://cdn.pixabay.com/photo/2025/06/26/04/23/colloseum-9681139_1280.png' },
    //     { id: '4', title: "4번 코인위키", thumbnail: 'https://cdn.pixabay.com/photo/2025/06/26/04/22/nature-9681112_1280.png' }
    // ];
    const items = series.map((s) => ({
        ...s,
        link: `/series/${s.id}`,
    }));

    return (
        <CardSlider type="originlSeries" items={items} loading={loading} />
    )
}