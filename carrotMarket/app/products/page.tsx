import Link from "next/link";

export default function Products() {
    return (
        <div className="w-96 *:box-border p-2 m-auto mt-6 text-center">
            <Link href="/profile" className="text-sm underline text-red-600 mt-2 mb-8 inline-block">Go Profile</Link>
        </div>
    )
}