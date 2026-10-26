'use client'
import { Suspense } from "react";
import { useSearchParams } from "next/navigation"
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SearchResultList from "./SearchResultList";

// URL(?q=)을 읽는 부분만 분리 → Suspense 안쪽에서 브라우저가 그림
function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    return (
        <>
            {/* 상단 헤더 */}
            <header className="sticky top-0 z-10 flex items-center gap-2 h-14 px-4 bg-white">
                <Link href="/" className="p-1 -ml-1 text-neutral-700" aria-label="뒤로가기">
                    <ChevronLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-base font-bold text-[#21252b] truncate">
                    <span className="text-blue-500">&apos;{query}&apos;</span> 검색 결과
                </h1>
            </header>

            <div className="px-6 pt-2 pb-10">
                <SearchResultList query={query || ''} />
            </div>
        </>
    )
}

export default function SearchPage() {
    return (
        <div className="flex justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col w-full max-w-[400px] bg-white min-h-screen">
                <Suspense fallback={<p className="py-20 text-center text-sm text-neutral-400">로딩 중...</p>}>
                    <SearchContent />
                </Suspense>
            </main>
        </div>
    )
}
