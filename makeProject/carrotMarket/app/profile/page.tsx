import { notFound, redirect } from "next/navigation";
import getSession from "../../lib/session";
import db from "../../lib/db";
import Button from "../../components/form-btn";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id
            }
        })
        if(user) {
            return user;
        }
    }
    notFound(); // next/navigation에서 불러올 수 있음
}

export default async function Profile() {
    // 유저 정보 가져오기
    const user = await getUser();
    const logOut = async () => {
        "use server"; // inline server action
        const session = await getSession();
        await session.destroy();
        redirect("/")
    }
    return (
        <div className="w-96 *:box-border p-2 m-auto mt-16 text-center ">
             <h1 className="text-2xl">Welcome! {user?.username}</h1>
             
             <ul className="text-left mt-4 bg-white rounded-xl p-6">
                <li>&lt; My profile &gt;</li>
                <li>username: {user?.username}</li>
                <li>email: {user?.email}</li>
                <li>password: 🔒 </li>
             </ul>

             <form action={logOut} className="w-full mt-6">
                <Button text="Log Out"/>
             </form>
        </div>
    )
}