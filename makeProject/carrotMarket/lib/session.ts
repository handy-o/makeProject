import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?:number 
}

export default async function getSession(req?: Request) {
    // console.log('쿠키', cookies());
    return getIronSession<SessionContent>(await cookies(), {
        cookieName: "merry_chrestmas", 
        password: process.env.COOKIE_PASSWORD!
    })
}