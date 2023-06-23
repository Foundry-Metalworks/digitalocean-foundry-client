import { RequestLike } from '@clerk/nextjs/dist/types/server/types'
import { getAuth } from '@clerk/nextjs/server'
import { dehydrate, QueryClient } from 'react-query'
import { query } from '@/api/network'
import { UserType } from '@/hooks/use-user'
import { InviteType } from '@/hooks/use-invites'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { WithServerSideAuthCallback, WithServerSideAuthResult } from '@clerk/nextjs/dist/types/ssr/types'
import { CACHE_TIME } from '@/constants'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    },
})

export const getDehydratedState = async (req: RequestLike) => {
    const { userId, getToken } = getAuth(req)
    if (userId) {
        const token = await getToken()

        await queryClient.prefetchQuery(
            ['getUser', userId],
            async () => await query<UserType>({ endpoint: '/users/me', token }),
            { staleTime: CACHE_TIME },
        )
        await queryClient.prefetchQuery(
            ['getInvites', userId],
            async () => await query<InviteType>({ endpoint: '/invites', token }),
            { staleTime: CACHE_TIME },
        )
    }
    return dehydrate(queryClient)
}

export function withAuthAndUser(callback?: WithServerSideAuthCallback<any, any>): WithServerSideAuthResult<any> {
    return withServerSideAuth(
        async (ctx) => {
            const result = callback != undefined ? await callback(ctx) : undefined
            const dehydratedState = await getDehydratedState(ctx.req)
            return { props: { ...result?.props, dehydratedState } }
        },
        { loadUser: true },
    )
}
