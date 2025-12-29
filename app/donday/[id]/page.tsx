import DondayDetailClient from "./DondayDetailClient";
import { getPostById } from "@/lib/dbApi";


export default async function DondayDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: post, error } = await getPostById(id);

    if (error || !post) {
        return <>일치하는 게시글 없음</>
    }

    return (
        <DondayDetailClient post={post} />
    )
}