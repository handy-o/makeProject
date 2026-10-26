import Link from "next/link"
import { Post } from "@/lib/supabase"

// 글 목록 (/search, /series/[id], /latest 공통)
export default function PostList({ posts }: { posts: Post[] }) {
    return (
        <ul className="divide-y divide-neutral-100">
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/donday/${post.id}`} className="flex items-center gap-4 py-4">
                        <img
                            src={post.thumbnail}
                            alt=""
                            className="w-20 h-20 shrink-0 rounded-xl object-cover bg-neutral-100"
                        />
                        <div className="min-w-0 flex-1">
                            <span className="block text-[11px] text-blue-500 truncate">{post.category}</span>
                            {/* break-keep: 한글이 단어 중간에서 줄바꿈되지 않게 */}
                            <h3 className="mt-0.5 text-sm font-bold leading-snug text-[#21252b] break-keep line-clamp-2">
                                {post.title}
                            </h3>
                            {post.subtitle && (
                                <p className="mt-1 text-xs leading-relaxed text-neutral-400 break-keep line-clamp-1">
                                    {post.subtitle}
                                </p>
                            )}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
