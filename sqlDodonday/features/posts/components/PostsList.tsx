// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchPosts } from '@/features/posts';
// import { Post } from '@/features/posts/types/typePosts'

// export const PostsList = () => {
//     const [posts, setPosts] = useState<Post[]>([]);

//     useEffect(() => {
//         fetchPosts()
//             .then((data) => setPosts(data))
//             .catch((err) => console.error(err));
//     }, []);
//     return (
//         <div>
//             <h1>게시글 목록</h1>
//             {posts.map(post => <div key={post.id}>{post.title}</div>)}
//         </div>
//     );
// }

'use client'; // 클라이언트 컴포넌트 선언

import { usePosts } from '../hooks/usePosts';
import Image from 'next/image';

export const PostsList = () => {
    const { posts, isLoading } = usePosts();
    const tempImg = 'https://cdn.inflearn.com/public/files/posts/0ee179f4-385a-49f5-9da6-bb2089d5ebb9/image.png';

    if (isLoading) return <div>데이터 로딩 중... 🚚</div>;
    if (posts.length === 0) return <div>게시글이 없습니다.</div>;

    return (
        <section>
            <h2>게시글 목록</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                        <h3>{post.title}</h3>
                        <Image src={post.thumbnail ?? tempImg}
                            fill
                            className="object-cover"
                            alt="" />
                        {/* <p>{post.content}</p> */}
                        <span>조회수: {post.views}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};