import React, { createContext, useMemo, PropsWithChildren } from 'react'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/router'

import { query, useQuery } from '@/api/network'
import RedirectTo from '@/components/shared/redirect'
import { PATHS } from '@/constants'
import { UserDispatch, UserType } from '@/context/user/types'
import { ContextType } from '@/types'

type UserContextType = ContextType<UserType | null, UserDispatch>

const UserContext = createContext<UserContextType>({
    isLoading: false,
    data: null,
    dispatch: {
        authorize: () => undefined,
    },
})

const InnerUserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { isSignedIn, isLoaded, userId, getToken } = useAuth()
    const { push } = useRouter()

    const shouldFetchUser = isLoaded && !!isSignedIn
    const { status, data, error, refetch } = useQuery<UserType>(
        {
            endpoint: '/users/me',
            enabled: shouldFetchUser,
        },
        [userId, shouldFetchUser],
    )

    const isLoading = !isLoaded || (shouldFetchUser && (status == 'loading' || status == 'idle'))
    const value: UserContextType = useMemo(
        () => ({
            data: isSignedIn ? data || null : null,
            isLoading: !isLoaded || isLoading,
            error: error || undefined,
            dispatch: {
                authorize: async (code: string) => {
                    const token = await getToken()
                    await query({
                        endpoint: '/users/authorize',
                        token,
                        method: 'PUT',
                        body: { code },
                    })
                    await refetch()
                    await push(PATHS.ROOT)
                },
            },
        }),
        [isLoading, isSignedIn, status, userId],
    )

    if (isLoaded && !isLoading) {
        if (!data) return <RedirectTo path={PATHS.ROOT} />
        return <UserContext.Provider value={value}>{children}</UserContext.Provider>
    }
    return null
}

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return <InnerUserProvider>{children}</InnerUserProvider>
}

export default UserContext
