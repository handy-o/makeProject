'use client';

import { useAuth } from "@/hook/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'


export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formLoading, setFormLoading] = useState(false) // 회원가입 요청상태
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const { signUp, user, loading: authLoading } = useAuth()
    const router = useRouter()


    // 로그인 된 사용자는 메인 페이지로 리다이렉트
    useEffect(() => {
        if (!authLoading && user) {
            router.push('/')
        }
    }, [authLoading, user, router])

    // 로딩 중일 때
    if (authLoading) {
        return (
            <div className="flex justify-center bg-zinc-200 min-h-screen">
                <main className="flex items-center justify-center w-full max-w-[400px] bg-white min-h-screen">
                    <div className="text-sm text-neutral-400">로딩 중...</div>
                </main>
            </div>
        )
    }
    // 로그인 된 사용자는 리다이렉트 중이므로 아무것도 렌더링 하지 않음
    if (user) {
        //router.push('/') // 렌더링 중 상태 변경으로 에러 발생 -> useEffect로 처리//
        return null
        // <pre>
        //     로그인된 사용자 정보: {JSON.stringify(user, null, 2)}
        // </pre>
    }

    // 입력 폼 이벤트 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.')
            return false
        }

        if (formData.password.length < 6) {
            setError('비밀번호는 6자 이상이어야 합니다.')
            return false
        }

        if (!formData.name.trim()) {
            setError('이름을 입력해주세요.')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormLoading(true)
        setError('')

        if (!validateForm()) {
            setFormLoading(false)
            return
        }

        const { error } = await signUp(
            formData.email,
            formData.password,
            formData.name,
            formData.phone
        )

        if (error) {
            setError(error.message)
            setFormLoading(false)
        } else {
            setSuccess(true)
            setFormLoading(false)
            // 회원가입 성공 후 로그인 페이지로 이동
            setTimeout(() => {
                router.push('/login')
            }, 3000)
        }
    }

    // 공통 input 스타일
    const inputClass = "block w-full pl-10 py-3 text-sm bg-neutral-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#21252b]"

    // 회원가입 성공 시 화면
    if (success) {
        return (
            <div className="flex justify-center bg-zinc-200 min-h-screen">
                <main className="flex flex-col items-center justify-center w-full max-w-[400px] bg-white min-h-screen px-6 text-center">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-[#21252b]">회원가입 완료! 🎉</h2>
                    <p className="mt-2 text-sm text-neutral-400">
                        회원가입이 성공적으로 완료되었습니다.<br />
                        잠시 후 로그인 페이지로 이동합니다.
                    </p>
                    <Link
                        href="/login"
                        className="mt-8 w-full py-3.5 text-sm font-bold rounded-xl text-white bg-[#21252b] hover:bg-black"
                    >
                        로그인 페이지로 이동
                    </Link>
                </main>
            </div>
        )
    }

    // 회원가입 화면
    return (
        <div className="flex justify-center bg-zinc-200 min-h-screen">
            <main className="flex flex-col w-full max-w-[400px] bg-white min-h-screen">
                {/* 상단 헤더 */}
                <header className="flex items-center h-14 px-4">
                    <Link href="/login" className="p-1 -ml-1 text-neutral-700" aria-label="뒤로가기">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                </header>

                <div className="flex-1 px-6 pt-6 pb-10">
                    <div>
                        <p className="text-xs text-neutral-500">돈이 되는 이야기</p>
                        <h2 className="mt-1 text-2xl font-bold text-[#21252b] leading-snug">
                            돈이 되는 습관,<br />지금 시작해 볼까요? 💰
                        </h2>
                    </div>

                    <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-medium text-neutral-500 mb-2">
                                    이름
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-neutral-400" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`${inputClass} pr-3`}
                                        placeholder="이름을 입력하세요"
                                    />
                                </div>
                            </div>

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
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`${inputClass} pr-3`}
                                        placeholder="이메일을 입력하세요"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-xs font-medium text-neutral-500 mb-2">
                                    전화번호 <span className="text-neutral-400">(선택)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-4 w-4 text-neutral-400" />
                                    </div>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${inputClass} pr-3`}
                                        placeholder="전화번호를 입력하세요"
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
                                        autoComplete="new-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`${inputClass} pr-10`}
                                        placeholder="비밀번호를 입력하세요 (6자 이상)"
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

                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs font-medium text-neutral-500 mb-2">
                                    비밀번호 확인
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-neutral-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`${inputClass} pr-10`}
                                        placeholder="비밀번호를 다시 입력하세요"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4 text-neutral-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-neutral-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 accent-[#21252b]"
                            />
                            <label htmlFor="terms" className="ml-2 block text-xs text-neutral-500">
                                <a href="#" className="underline underline-offset-2">이용약관</a> 및{' '}
                                <a href="#" className="underline underline-offset-2">개인정보처리방침</a>에 동의합니다.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={formLoading}
                            className="w-full py-3.5 text-sm font-bold rounded-xl text-white bg-[#21252b] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formLoading ? '가입 중...' : '회원가입'}
                        </button>

                        <p className="text-center text-xs text-neutral-400">
                            이미 계정이 있으신가요?{' '}
                            <Link href="/login" className="font-bold text-[#21252b] underline underline-offset-2">
                                로그인
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    )
}
