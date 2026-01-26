'use client'

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export interface CustomUser {
    id: string
    email: string
    name: string | null
    phone: string | null
    avatar_url: string | null
    email_verified: boolean
    created_at: string
    survey_result_type?: string | null // 사용x (이전프로젝트용)
    survey_completed_at?: string | null // 사용x (이전프로젝트용)
    is_subscribed: boolean
}

export function useAuth() {
    const [user, setUser] = useState<CustomUser | null>(null) 
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const userId = localStorage.getItem('user_id')
        if(userId) {
            fetchUser(userId)
        } else {
            setLoading(false)
        }
    }, [])

    const fetchUser = async (userId: string) => {
        try {
            const {data, error} = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single() // supabase 호출 및 결과 반환

            if(error) { // supabase 쿼리 결과 에러 처리
                throw error;
            }
            // 성공 로직
            setUser(data)
            // console.log('패치유저data', data)
        } catch(error) { // 런타임 에러 처리
            console.error('Error fetching user: ', error)
            localStorage.removeItem('user_id')
            setUser(null)
        } finally {
            setLoading(false)
        }
    } 

    // 회언가입
    const signUp = async(email: string, password: string, name?: string, phone?: string) =>{
        try {
            // 커스텀 함수
            try {
                const {data, error} = await supabase.rpc('signup_user', {
                    user_email: email,
                    user_password: password,
                    user_name: name,
                    user_phone: phone
                })

                // 성공 처리
                if (!error && data && data.length > 0 && data[0].success) {
                    return { data: data[0], error: null }
                }
                // 시스템 오류
                if(error) {
                    return {data: null, error}
                }
                // 비즈니스 로직 실패 (규칙 위반 등)
                if (data && data.length > 0 && !data[0].success) {
                    return { data: null, error: { message: data[0]?.message || '회원가입에 실패했습니다.' } }
                }
            } catch(rpcError) {
                console.log('회원가입 실패')
            }

            // 커스텀 함수 실패 시 supabase 기본 이증
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name:name || email.split('@')[0]
                    }
                }
            })

            if(error) {
                return {data: null, error}
            }

            // supabase에 insert
            if(data.user) {
                const {error: profileInsertError} = await supabase.from('profiles')
                .insert({
                    id: data.user.id,
                    email,
                    ame:name || data.user.email?.split('@')[0],
                    phone,
                    is_subscribed: false,
                    created_at: new Date().toISOString()
                })
                if(profileInsertError) {
                    console.error('profiles테이블 insert 실패', profileInsertError)
                }
            }

            return {data: data.user, error: null}
        } catch (error) {
            return {data:null, error: {message:'회원가입 중 오류가 발생했습니다.'}}
        }
    }

    // 로그인
    const signIn = async (email:string, password:string) => {
        try {
            // 커스텀 함수 시도
            try {
                const {data, error} = await supabase.rpc('login_user', {
                    user_email: email,
                    user_password: password
                })

                if(!error && data && data.length > 0 && data[0].success) {
                    localStorage.setItem('user_id', data[0].user_id)
                    await fetchUser(data[0].user_id)
                    return {data: data[0], error: null}
                }
            } catch(rpcError) {
                console.log('Custom auth no available')
            }

            // 커스텀 함수 없으면 supabase 기본 인증 사용
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if(error) {
                return {data: null, error}
            }
            if(data.user) {
                localStorage.setItem('user_id', data.user.id)
                
                await fetchUser(data.user.id)
                
                return {data: data.user, error:null}
            } 

            return { data: null, error: { message: '로그인에 실패했습니다.' } }
        } catch (error) {
            if (error instanceof Error) {
            return { data: null, error };
        }
            return { data: null, error: { message: '로그인 중 오류가 발생했습니다.', detail: JSON.stringify(error) } }
        }
        

    }

    // 로그 아웃
    const signOut = async () => {
        localStorage.removeItem('user_id')
        setUser(null)
        return {error: null}
    }

    
    // 구독하기
    const updateSubscription = async (newStatus: boolean) => {
        if(!user) {
            return {error: {messeage: '로그인된 사용자가 아닙니다.'}}
        }
        try {
            // supbabase profiles 테이블 업데이트!
            console.log('user', user)
            console.log('user', user.id)
            const {data, error} = await supabase.from('profiles')
            .update({is_subscribed: newStatus})
            .eq('id', user.id)
            .select()

            if(error) {
                console.error('구독 상태 업데이트 오류: ', error)
                return {error}
            }

            // 전역 user 상태 업데이트
            if(data && data.length > 0) {
                const updatedProfile = data[0] as CustomUser;
                setUser(prevUser => {
                    if(!prevUser) return null;
                    return {
                        ...prevUser,
                        is_subscribed: updatedProfile.is_subscribed
                    } as CustomUser
                })
                // 성공 반환 시 단일 객체 반환
                return { data: updatedProfile, error: null }
            }

            // 데이터가 0개인 경우
            return {data: null, error: null}
        } catch(error) {
            console.error('구독 상태 업데이트 중 예외 발생', error)
            return {error: {message:'구독 상태 업데이트 중 예외 발생'}}
        }
    }

    return {
        user,
        loading,
        signUp,
        signIn,
        signOut,
        updateSubscription
    }

}