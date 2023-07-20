import { useEffect, useRef } from 'react'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { QueryClient } from 'react-query'

const localStoragePersistor = createWebStoragePersistor({
    storage: typeof window != 'undefined' ? window.localStorage : (undefined as unknown as Storage),
})

const usePersistedQueries = (queryClient: QueryClient): boolean => {
    const triggered = useRef<boolean>(false)

    useEffect(() => {
        if (!triggered.current) {
            persistQueryClient({
                queryClient,
                persistor: localStoragePersistor,
            }).then(() => {
                triggered.current = true
                console.log('persisted queries')
            })
        }
    }, [queryClient])

    return triggered.current
}

export default usePersistedQueries
