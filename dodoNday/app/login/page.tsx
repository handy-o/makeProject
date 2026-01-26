'use client'

import { useAuth } from "@/hook/useAuth"
import { Eye, EyeOff, Link, Lock, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

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
            <div className="min-h-screen bg-gray-50">
                <div className="flex items-center justify-center h-64">
                    <div className="text-neutral-500">로딩 중...</div>
                </div>
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

        const { error } = await signIn(email, password) // useAuth-supabase

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/donday')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="mx-auto h-12 w-12 bg-primary-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">H</span>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-bold text-neutral-500">
                            로그인
                        </h2>
                        <p className="mt-2 text-center text-sm text-neutral-400">
                            HobbyMate에 오신 것을 환영합니다
                        </p>
                    </div>

                    {/* handleSubmit */}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-500 mb-2">
                                    이메일
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="이메일을 입력하세요"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-500 mb-2">
                                    비밀번호
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="비밀번호를 입력하세요"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-neutral-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-neutral-400" />
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
                                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-500">
                                    로그인 상태 유지
                                </label>
                            </div>

                            <div className="text-sm">
                                <button className="font-medium text-primary-500 hover:text-primary-600">
                                    비밀번호를 잊으셨나요?
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? '로그인 중...' : '로그인'}
                            </button>
                        </div>

                        <div className="text-center">
                            <span className="text-sm text-neutral-400">
                                계정이 없으신가요?{' '}
                                <Link href="/signup" className="font-medium text-primary-500 hover:text-primary-600">
                                    회원가입
                                </Link>
                            </span>
                        </div>
                    </form>
                    {/* ./handleSubmit */}
                </div>
            </div>
        </div>
    )
}