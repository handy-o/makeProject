import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getPostsBySeries, getSeriesById } from "@/lib/dbApi";
import { Post } from "@/lib/supabase";
import PostList from "@/components/PostList";

export default async function SeriesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // 1) 시리즈 정보 가져오기
    const { data: series, error } = await getSeriesById(Number(id));

    if (error || !series) {
        return <>일치하는 시리즈 없음</>
    }

    // 2) 시리즈 이름으로 글 목록 가져오기
    const { data } = await getPostsBySeries(series.title);
    const posts: Post[] = data || [];

    return (
        <div className="flex justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col w-full max-w-[400px] bg-white min-h-screen">
                {/* 상단 헤더 */}
                <header className="sticky top-0 z-10 flex items-center gap-2 h-14 px-4 bg-white">
                    <Link href="/" className="p-1 -ml-1 text-neutral-700" aria-label="뒤로가기">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-base font-bold text-[#21252b] truncate">{series.title}</h1>
                </header>

                <div className="px-6 pt-2 pb-10">
                    {posts.length === 0 ? (
                        <p className="py-20 text-center text-sm text-neutral-400">아직 등록된 글이 없어요 🥲</p>
                    ) : (
                        <>
                            <p className="text-xs text-neutral-500 mb-4">총 {posts.length}편</p>
                            <PostList posts={posts} />
                        </>
                    )}
                </div>
            </main>
        </div>
    )

}