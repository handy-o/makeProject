"use client";

import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useOptimistic, useTransition } from "react";
// import { revalidateTag } from "next/cache";

interface AddCommentProps {
  tweetId: number;
  initialComments: Comment[];
}

interface Comment {
  id: number;
  comment_txt: string;
  userId: number;
  created_at: Date;
  updated_at: Date;
  tweetId: number;
  user: {
    username: string;
    avatar: string;
  };
}

export default function AddComment({ tweetId, initialComments }: AddCommentProps) {
  // Optimistic state for comments
  const [state, updateOptimisticState] = useOptimistic(
    { comments: initialComments }, 
    (prevState: { comments: Comment[] }, newComment: Comment) => {
      return {
        comments: prevState.comments.concat(newComment), // 기존 댓글에 새로운 댓글 추가
      };
    }
  );

  const [isPending, startTransition] = useTransition();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    // 새로운 댓글 객체 생성
    const newComment: Comment = {
      id: Date.now(), // 임시 ID
      comment_txt: commentText,
      userId: 1, // 사용자 ID
      created_at: new Date(),
      updated_at: new Date(),
      tweetId, // 해당 트윗 ID
      user: {
        username: "Current User", // 사용자 이름
        avatar: "/default_avatar.png", // 사용자 아바타
      },
    };

    // 상태 업데이트
    startTransition(() => {
      console.log("Adding new comment:", newComment);
      updateOptimisticState(newComment); // 새로운 댓글을 추가
      // revalidateTag("post-detail"); 
    });

    setCommentText(""); // 댓글 입력창 비우기
  };
  console.log(state)
  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 입력하세요."
        className="rounded-md border border-neutral-400 w-full p-2 text-sm"
        rows={4}
      />
      <button
        onClick={handleAddComment}
        className="mt-2 bg-blue-500 text-white rounded-md p-2"
        disabled={isPending}
      >
        {isPending ? "등록 중..." : "등록"}
      </button>

      <div className="mt-4">
        {state.comments.length > 0 && (
          <p className="p-2 bg-neutral-100 mb-4">
            <ChatBubbleBottomCenterTextIcon className="inline size-4" /> {state.comments.length}
          </p>
        )}

        {state.comments.map((cmt) => (
          <div key={cmt.id} className="flex flex-row flex-shrink-0 gap-4 align-middle w-full mb-2">
            <p className="rounded-full overflow-hidden shadow-md content-center w-9 h-9">
              <img src={cmt.user.avatar} alt={cmt.user.username} className="m-auto" />
            </p>
            <div className="border border-neutral-100 rounded-md shadow-md flex-grow p-2">
              <b>{cmt.user.username}</b>{" "}
              <span className="text-xs text-neutral-600">
                {new Date(cmt.created_at).toLocaleDateString()}
              </span>
              <p className="font-medium text-sm">{cmt.comment_txt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}