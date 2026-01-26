import db from "../lib/db";
import TweetList from "../components/tweet-list";
import { Prisma } from "@prisma/client";
import AddTweet from "../components/add-tweet";

async function getInitialTweets() {
    const tweets = await db.tweet.findMany({
        select: {
            id: true,
            created_at: true,
            updated_at: true,
            contents_txt: true,
            contents_img: true,
            user: {
                select: {
                    username: true,
                    avatar: true
                }
            }
        }
    })
    return tweets
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
    const initialTweets = await getInitialTweets();
    console.log('initialTweet', initialTweets)

    return (
        <main className="w-96 *:box-border p-2 m-auto mt-14">
            <section>
                <TweetList initialTweets={initialTweets} />
            </section>
            <aside className="fixed bottom-4 right-4">
                <AddTweet/>
            </aside>
        </main>
    ) 
}