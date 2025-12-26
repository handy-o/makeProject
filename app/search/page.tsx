'use client'
import { useSearchParams } from "next/navigation"
import SearchResultList from "./SearchResultList";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    return (
        <>
            <h1>{query} 검색 결과 </h1>
            <SearchResultList query={query || ''} />
        </>
    )
}