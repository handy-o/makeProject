import { useEffect } from "react"

// 저장된 위치를 지움 → 다음에 들어가면 맨 위에서 시작
export const clearScrollRestore = (key: string) => sessionStorage.removeItem(`scroll:${key}`)

// 페이지를 떠날 때 스크롤 위치를 sessionStorage에 저장하고, 다시 돌아오면 그 위치로 복원
export function useScrollRestore(key: string) {
    useEffect(() => {
        const storageKey = `scroll:${key}`

        // 저장: 링크/버튼을 누르는 순간의 위치를 기록
        const save = () => sessionStorage.setItem(storageKey, String(window.scrollY))
        document.addEventListener('click', save, true)

        // 복원: 저장된 위치가 있으면 그 위치로 이동
        const saved = Number(sessionStorage.getItem(storageKey))

        // 데이터가 늦게 그려져서 처음엔 페이지가 짧음 → 높이가 바뀔 때마다 다시 이동
        const restore = () => window.scrollTo(0, saved)
        const resizeObserver = new ResizeObserver(restore)

        const stop = () => {
            resizeObserver.disconnect()
            clearTimeout(timer)
            window.removeEventListener('wheel', finish)
            window.removeEventListener('touchstart', finish)
            window.removeEventListener('keydown', finish)
        }
        // 사용자가 직접 스크롤하거나 3초가 지나면 복원 끝 → 저장값은 이때 지움
        // (읽자마자 지우면 개발 모드 Strict Mode에서 effect가 두 번 실행될 때 두 번째에 값이 없음)
        const finish = () => {
            stop()
            sessionStorage.removeItem(storageKey)
        }
        const timer = setTimeout(finish, 3000)

        if (saved > 0) {
            resizeObserver.observe(document.body)
            window.addEventListener('wheel', finish, { passive: true })
            window.addEventListener('touchstart', finish, { passive: true })
            window.addEventListener('keydown', finish)
            restore()
        } else {
            stop()
        }

        return () => {
            stop()
            document.removeEventListener('click', save, true)
        }
    }, [key])
}
