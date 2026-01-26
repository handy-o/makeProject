"use client";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";


export default function Navigation() {
    const router = useRouter();
    const handleBack = () => {
        router.back(); // Next.js의 내장 메서드
    };


    return (
        <main className="w-96 *:box-border p-2 m-auto mt-14">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md h-[40px] flex items-center">
                <div className="w-96 m-auto px-4 *:hover:cursor-pointer flex justify-between">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-500" onClick={handleBack}/>
                    <Link href="/"><HomeIcon className="h-6 w-6 text-gray-500" /></Link>
                    <ArrowLeftIcon className="h-6 w-6 text-gray-500 opacity-0 hover:pointer-events-none" />
                </div>
            </div>
        </main>
       
    )
}