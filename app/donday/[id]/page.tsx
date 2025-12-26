import { supabase } from "@/lib/supabase";
import DondayDetailClient from "./DondayDetailClient";


export default async function DondayDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: post, error } = await supabase
        .from('dd_post')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !post) {
        return <>일치하는 게시글 없음</>
    }

    return (
        <DondayDetailClient post={post} />
    )
}