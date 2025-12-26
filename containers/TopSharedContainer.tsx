import { useEffect, useRef, useState } from "react";
import CardSlider from "@/components/CardSlider";
import { getItemsByMain } from "@/app/api/posts/route";



export default function TopSharedContainer() {
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getItemsByMain();
      // const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setPosts(data.data || []);
      }
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };
  // const posts = [
  //     {title: "1번째 카드", img:'https://cdn.pixabay.com/photo/2022/02/18/12/48/blue-whale-drawing-7020598_1280.png'},
  //     {title: "2번째 부동산 대책\n효과 있을까?", img:'https://cdn.pixabay.com/photo/2025/06/26/04/23/cat-9681126_1280.png'},
  //     {title: "3번째 카드", img:'https://cdn.pixabay.com/photo/2025/06/26/04/23/colloseum-9681139_1280.png'},
  //     {title: "4번째 카드", img:'https://cdn.pixabay.com/photo/2025/06/26/04/22/nature-9681112_1280.png'}
  // ];
  return (
    <CardSlider type="topShared" items={post} loading={loading} />
  )
}