
export const fetchProducts = async () => {
  const response = await fetch('/api/products'); // 내 서버의 API 라우트 호출
  if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.');
  return response.json();
};