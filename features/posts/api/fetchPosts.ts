// import { Post } from '../types/typePosts';
// const API_BASE_URL = 'http://localhost:3001/api';

// export const fetchPosts = async(): Promise<Post[]> => {
//     const res = await fetch(`${API_BASE_URL}/posts`)

//     if(!res.ok) {
//         throw new Error('게시글을 불러오는 중 오류가 발생했습니다.');
//     }

//     return res.json();
// }


export const fetchPosts = async () => {
  const response = await fetch('/api/posts'); // 내 서버의 API 라우트 호출 (전체)
                      // fetch('/api/search?search=안녕하세요') (키워드 검색)
  if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.');
  return response.json();
};