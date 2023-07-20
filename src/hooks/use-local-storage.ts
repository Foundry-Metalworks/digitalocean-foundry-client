import { useCallback, useEffect, useRef } from 'react'

const useLocalStorage = <T extends any>(key: string): [T | undefined, (data: T | undefined) => void] => {
    const ref = useRef<T | undefined>(undefined)
    const setData = useCallback(
        (data: T | undefined) => {
            if (localStorage) {
                if (data) localStorage.setItem(key, JSON.stringify(data))
                else localStorage.removeItem(key)
            }
            ref.current = data
        },
        [key],
    )

    useEffect(() => {
        const cachedData = localStorage.getItem(key)
        if (cachedData) {
            try {
                ref.current = JSON.parse(cachedData)
            } catch {
                ref.current = cachedData as T | undefined
            }
        }
    }, [key])

    return [ref.current, setData]
}

export default useLocalStorage
