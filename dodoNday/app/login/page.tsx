'use client'

import { useAuth } from "@/hook/useAuth"
import { clearScrollRestore } from "@/hook/useScrollRestore"
import { ChevronLeft, Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const { signIn, user, loading: authLoading } = useAuth()
    const router = useRouter()

    // 로그인된 사용자는 메인 페이지로
    useEffect(() => {
        if (!authLoading && user) {
            router.push('/')
        }
    }, [authLoading, user, router])

    // 로딩 중
    if (authLoading) {
        return (
            <div className="flex justify-center bg-zinc-200 min-h-screen">
                <main className="flex items-center justify-center w-full max-w-[400px] bg-white min-h-screen">
                    <div className="text-sm text-neutral-400">로딩 중...</div>
                </main>
            </div>
        )
    }

    // 로그인된 사용자는 리다이렉트 중이므로 아무것도 렌더링하지 않음
    if (user) {
        return null
    }

    // 폼 입력
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await signIn(email, password, rememberMe) // useAuth-supabase

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // 로그인 후에는 메인 상단부터 (구독 전이면 상단 배너가 펼쳐짐)
            clearScrollRestore('home')
            router.push('/')
        }
    }

    return (
        <div className="flex justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col w-full max-w-[400px] bg-white min-h-screen">
                {/* 상단 헤더 */}
                <header className="flex items-center h-14 px-4">
                    <Link href="/" className="p-1 -ml-1 text-neutral-700" aria-label="뒤로가기">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                </header>

                <div className="flex-1 px-6 pt-6 pb-10">
                    <div>
                        <p className="text-xs text-neutral-500">돈이 되는 이야기</p>
                        <h2 className="mt-1 text-2xl font-bold text-[#21252b] leading-snug">
                            다시 만나서 반가워요 👋<br />로그인해 주세요
                        </h2>
                    </div>

                    {/* handleSubmit */}
                    <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-neutral-500 mb-2">
                                    이메일
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-neutral-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 text-sm bg-neutral-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#21252b]"
                                        placeholder="이메일을 입력하세요"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-medium text-neutral-500 mb-2">
                                    비밀번호
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-neutral-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 text-sm bg-neutral-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#21252b]"
                                        placeholder="비밀번호를 입력하세요"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-neutral-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-neutral-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 accent-[#21252b]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs text-neutral-500">
                                    로그인 상태 유지
                                </label>
                            </div>

                            <button type="button" className="text-xs text-neutral-400 hover:text-neutral-600">
                                비밀번호를 잊으셨나요?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 text-sm font-bold rounded-xl text-white bg-[#21252b] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '로그인 중...' : '로그인'}
                        </button>

                        <p className="text-center text-xs text-neutral-400">
                            계정이 없으신가요?{' '}
                            <Link href="/signup" className="font-bold text-[#21252b] underline underline-offset-2">
                                회원가입
                            </Link>
                        </p>
                    </form>
                    {/* ./handleSubmit */}
                </div>
            </main>
        </div>
    )
}
