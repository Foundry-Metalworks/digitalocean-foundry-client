import { dehydrate, QueryClient } from 'react-query'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { WithServerSideAuthCallback, WithServerSideAuthResult } from '@clerk/nextjs/dist/types/ssr/types'
import { CACHE_TIME } from '@/constants'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            staleTime: CACHE_TIME,
        },
    },
})

export function withSSR(callback?: WithServerSideAuthCallback<any, any>): WithServerSideAuthResult<any> {
    return withServerSideAuth(
        async (ctx) => {
            const result = callback != undefined ? await callback(ctx) : undefined
            return { props: { ...result?.props, dehydratedState: dehydrate(queryClient) } }
        },
        { loadUser: true },
    )
}
