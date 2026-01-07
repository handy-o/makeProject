import TopBanner from '@/features/posts/components/TopBanner';
import Recommend from '@/features/products/components/Recommend';
import { Post, fetchPosts, PostsList } from '@/features/posts';

export default function App() {
  return (
    <main className='bg-gray-100'>
      <div className="inner max-w-lg overflow-hidden m-auto bg-white">
        {/* <h1>돈데이 메인 페이지</h1> */}
        {/* <PostsList /> */}
        <TopBanner />
        <Recommend />
      </div>
    </main>
  );
}