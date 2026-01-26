"use client";

import Image from "next/image";
import { InitialTweets } from "../app/page"
import { toLocaleDateStr } from "../lib/utils";
import Link from "next/link";

interface TweetListProps {
    initialTweets: InitialTweets
}

export default function TweetList({initialTweets}: TweetListProps) {
    console.log("initialTweetsssssssss", initialTweets)
    return (
            <div className="p-5 flex flex-col gap-5">
                {initialTweets.map((tweet, idx) => (
                    <Link  key={tweet.id}  href={`/tweet/${tweet.id}`} className="block w-full" >
                        <div className={`flex gap-4  ${idx === initialTweets.length - 1 ? "" : "border-b-solid border-b-2" } pb-5 w-full`}>
                            <p className="rounded-xl overflow-hidden flex-shrink-0 w-5 h-5">
                                <Image src={tweet.user.avatar} alt={tweet.user.username} width={20} height={20} className="object-cover"/>
                            </p>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex gap-2 align-middle">
                                    <p><b>{tweet.user.username}</b></p>
                                    <p className="text-sm text-neutral-600">{toLocaleDateStr(tweet.updated_at)}</p>
                                </div>
                                
                                <p>{tweet.contents_txt}</p>
                                <p className="relative w-full">
                                    <Image src={tweet.contents_img} alt={"img"} className="max-w-max h-auto rounded-lg"
                                    layout="responsive" width={100} height={100}  />
                            </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
    )
}