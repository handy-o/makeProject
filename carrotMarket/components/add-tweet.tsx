import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default function AddTweet(){
    return (
        <Link href="/tweet/add" className="flex items-center justify-center size-12 bg-blue-800  rounded-full">
            <PlusIcon className="size-8 text-white" />
        </Link>
    )
    
}