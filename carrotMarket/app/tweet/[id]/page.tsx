import db from "../../../lib/db";
import getSession from "../../../lib/session";
import { toLocaleDateStr, toLocaleTimeStr } from "../../../lib/utils";
import { ChatBubbleBottomCenterTextIcon, EyeIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../../../components/like-btn";
import Button from "../../../components/form-btn";
import AddComment from "../../../components/comment-btn";


async function getTweet(id: number) {
    try {
        const tweet = await db.tweet.update({
            where: { id },
            data: { views: { increment: 1 } },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                },
                _count: {
                    select: {
                        Comment: true,
                        LikeToken: true,
                    }
                }
            },
        });
        return tweet;
    } catch (e) {
        return null;
    }
}
const getCachedPost = nextCache(getTweet, ["post-detail"], {
    tags: ["post-detail"],
    revalidate: 60,
})


async function getLikeStatus(tweetId: number, userId: number) {
    // const session = await getSession();
    const isLiked = await db.like.findFirst({
      where: {
        tweetId, // tweetId 필드로 조건을 주고
        userId: userId, // userId 필드를 조건으로 설정
      },
    });
    const likeCount = await db.like.count({
      where: {
        tweetId,
      },
    });
    return {
      likeCount,
      isLiked: Boolean(isLiked),
    };
}
async function getCachedLikeStatus(tweetId: number) {
    const session = await getSession()
	const userId = session.id
    const getCachedLikeStatus = nextCache(getLikeStatus, ["product-like-status"], {
      tags: [`like-status-${tweetId}`],
      revalidate: 60,
    });
    return getCachedLikeStatus(tweetId, userId);
}
  

async function getCommentStatus(tweetId: number, userId: number) {
    const comments = await db.comment.findMany({
        where: {
            tweetId,
            userId
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatar: true
                }
            },
        }
    })
    return comments
}
async function getCachedCommentStatus(tweetId: number) {
    const session = await getSession()
	const userId = session.id
    const getCachedCommentStatus  = nextCache(getCommentStatus, ["product-comment-status"], {
      tags: [`comment-status-${tweetId}`],
      revalidate: 1
    });
    return getCachedCommentStatus(tweetId, userId);
}


export default async function tweetDetail({params} : {
    params: Promise<{ id: string }>
}) {
    
    //console.log('params',  params)
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    if(isNaN(id)) notFound();
    const tweet = await getCachedPost(id);
    if(!tweet) notFound();

    const { likeCount, isLiked } = await getCachedLikeStatus(id);
    const comments = await getCachedCommentStatus(id);
    // console.log('commentsssss', comments)
    return (
        <main className="mt-16 px-6">
            <section className="flex gap-4 pb-5 w-full">
                <div className="flex flex-col gap-3 p-2 bg-white w-full">
                    <div className="flex gap-2 align-middle">
                        <p className="rounded-xl overflow-hidden">
                            <Image src={tweet.user.avatar} alt={tweet.user.username} width={40} height={40}/>
                        </p>
                        <p><b>{tweet.user.username}</b></p>
                    </div>
                    <p>{tweet.contents_txt}</p>
                    <p className="relative w-full">
                        <Image src={tweet.contents_img} alt={"img"}  className="max-w-max h-auto rounded-lg"
                        layout="responsive" width={100} height={100}  />
                    </p>
                    <p className="text-sm text-neutral-600 text-right">
                        {toLocaleTimeStr(tweet.updated_at)} {toLocaleDateStr(tweet.updated_at)}
                    </p>
                </div>
            </section>

            <section className="flex flex-row gap-5 justify-between align-middle text-neutral-400 text-sm py-4">
                    <Link href="/" className="hover:underline hover:underline-offset-4 ">목록으로</Link>

                    <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id}/>

                    <div className="flex items-center">
                        <EyeIcon className="size-5" />
                        <span className="text-xs pl-1">조회 {tweet.views}</span>
                    </div>
            </section>

            <section className="mt-10">
                <div id="addComment" className="  mb-10">
                    {/* <textarea name="comment_txt" id="comment_txt" placeholder="댓글을 입력해주세요" className="rounded-md border border-neutral-400 overflow-hidden w-full p-2 text-sm " rows={4}>

                    </textarea>
                    <form action="">
                        <Button text="등록"/>
                    </form> */}

                    
                    <AddComment 
                    tweetId={id} 
                    initialComments={comments} 
                    />

                </div>

                {/* <div id="commentList">
                    {comments.length !== 0 ? <p className="p-2 bg-neutral-100 mb-4"> <ChatBubbleBottomCenterTextIcon className="inline size-4" /> {comments.length}</p> : null }
                    {comments.map((cmt, index) => (
                        <div key={index} className="flex flex-row flex-shrink-0 gap-4 align-middle w-full">
                            <p className="rounded-full overflow-hidden shadow-md content-center w-9 h-9">
                                <Image src={tweet.user.avatar} alt={tweet.user.username} width={20} height={20} className="m-auto"/>
                            </p>
                            <div className="border border-neutral-100 rounded-md shadow-md flex-grow p-2">
                                <b>{tweet.user.username}</b> <span className="text-xs text-neutral-600">{toLocaleDateStr(cmt.created_at)}</span>
                                <p className="font-medium text-sm"> {cmt.comment_txt}</p>
                            </div>
                        </div>                  
                    ))}
                </div> */}
                
            </section>
        </main>
    );
}