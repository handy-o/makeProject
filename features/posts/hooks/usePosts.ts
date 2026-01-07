// import { useState, useEffect } from 'react';
// import { fetchPosts } from '../api/fetchPosts';
// import { Post } from '../types/typePosts';
// export const usePosts = () => {
//    const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchPosts()
//       .then((data) => setPosts(data))
//       .catch((err) => console.error(err))
//       .finally(() => setIsLoading(false));
//   }, []);

//   return { posts, isLoading };
// };

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/fetchPosts';
import { Post } from '../types/typePosts';


export const usePosts = () => {
  const {data: posts = [], isLoading, error} = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5
  })
  return { posts, isLoading, error };
};