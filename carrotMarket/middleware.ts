import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import { notFound } from "next/navigation";

interface Routes {
    [key:string] : boolean;
}
// array보다 object가 검색이 좀더 빠름
const publicOnlyUrls: Routes = {
    "/log-in": true,
    "/sms" : true,
    "/create-account" : true
}

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname]; // object에 값이 있는지 체크하는게 배열검색보다 빠름

    if(!session.id) { //console.log("??로그인X")
        if(!exists) {
            return NextResponse.redirect(new URL("/log-in", request.url))
        } 
    } else { //console.log("로그인o")
        if(exists) { 
            if(request.nextUrl.pathname === '/') return
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"]
}