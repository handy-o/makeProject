import Link from "next/link"

export const metadata = {
    title: 'Not Found'
}

export default function NotFound() {
    return (
        <div>
            <h2>Page is not found.</h2>
            <hr/>
            <Link href="/"> Go Home </Link>
        </div>
       
    ) 
}