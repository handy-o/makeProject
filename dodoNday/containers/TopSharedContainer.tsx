import { useEffect, useState } from "react";
import CardSlider from "@/components/CardSlider";
import { getPostsMain } from "@/lib/dbApi";
import { Post } from "@/lib/supabase";


export default function TopSharedContainer() {
  const [post, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await getPostsMain();
      if (error) {
        setError(error.message);
      } else {
        setPosts(data || []);
      }
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.')
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardSlider type="topShared" items={post} loading={loading} />
  )
}