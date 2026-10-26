import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getLatestPosts } from "@/lib/dbApi";
import { Post } from "@/lib/supabase";
import PostList from "@/components/PostList";

// 주소에 바뀌는 값이 없어서 그대로 두면 빌드 때 한 번만 만들어짐(○ Static)
// → 새 글이 반영되도록 요청마다 새로 만들기(ƒ Dynamic)
export const dynamic = 'force-dynamic';

export default async function LatestPage() {
    const { data } = await getLatestPosts();
    const posts: Post[] = data || [];

    return (
        <div className="flex justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col w-full max-w-[400px] bg-white min-h-screen">
                {/* 상단 헤더 */}
                <header className="sticky top-0 z-10 flex items-center gap-2 h-14 px-4 bg-white">
                    <Link href="/" className="p-1 -ml-1 text-neutral-700" aria-label="뒤로가기">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-base font-bold text-[#21252b] truncate">최신글</h1>
                </header>

                <div className="px-6 pt-2 pb-10">
                    {posts.length === 0 ? (
                        <p className="py-20 text-center text-sm text-neutral-400">아직 등록된 글이 없어요 🥲</p>
                    ) : (
                        <>
                            <p className="text-xs text-neutral-500 mb-4">최근 {posts.length}편</p>
                            <PostList posts={posts} />
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
