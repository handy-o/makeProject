'use client'

import AverageColor from "@/lib/AverageColor"
interface Post {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    tags?: string[];
    created_at: string;
}

export default function DondayDetailClient({ post }: { post: Post }) {
    return (
        <div className="flex items-center justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col max-w-[400px] bg-white min-h-screen">
                <AverageColor src={post.thumbnail}>
                    {(bgColor) => (
                        <div
                            className="thumbnail p-6 transition-colors duration-500"
                            style={{ backgroundColor: bgColor }}
                        >
                            <img src={post.thumbnail} alt="" />
                            <span className="text-xs rounded-2xl bg-white/50 px-2 py-1">
                                {post.tags?.[0]}
                            </span>
                            <p className="text-xl font-bold mt-2">{post.title}</p>
                            <p className="text-xs text-black/40">{post.created_at.split('T')[0]}</p>
                        </div>
                    )}
                </AverageColor>
                <div className="content p-6 leading-relaxed">
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </main>
        </div>

    )
}