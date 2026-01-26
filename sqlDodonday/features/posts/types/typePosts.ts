export interface Post {
  id: number;
  title: string;
  subtitle: string | null;
  thumbnail: string | null;
  tags: string | null;  // DB에서 문자열로 가져온다면 string, JSON 타입으로 가져온다면 string[]
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
}