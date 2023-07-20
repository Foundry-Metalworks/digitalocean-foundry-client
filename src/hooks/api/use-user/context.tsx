import React, { PropsWithChildren, useEffect, useMemo } from 'react'
import { UseDataType } from '@/types'
import { UserActions, UserType } from './types'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { query, useQuery } from '@/api/network'
import { PATHS } from '@/constants'
import { notifications } from '@mantine/notifications'
import { useCachedId, useCachedUser } from '@/hooks/api/use-user/cache'

const UserContext = React.createContext<UseDataType<UserType, UserActions>>({
    actions: {
        authorize: () => undefined,
        unauthorize: () => undefined,
    },
    isLoading: false,
    data: undefined,
    refetch: () => undefined,
})

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { userId: authUserId, getToken, isLoaded, isSignedIn } = useAuth()
    const [userId, setUserId] = useCachedId()
    const [cachedData, setCachedData] = useCachedUser()
    const { push } = useRouter()

    useEffect(() => {
        if (isLoaded) {
            setUserId(authUserId || undefined)
        }
    }, [isLoaded, isSignedIn])

    // fetch data
    const { isLoading, error, refetch } = useQuery<UserType>(
        'getUser',
        {
            endpoint: '/users/me',
            enabled: !!authUserId,
            postFetch: (data) => {
                setCachedData(data)
                return data
            },
            onSuccess: (data) => {
                setCachedData(data)
            },
        },
        [authUserId],
    )

    const contextValue = useMemo(
        () => ({
            isLoading: !isLoaded || isLoading || userId != authUserId,
            data: userId ? cachedData : undefined,
            error,
            refetch,
            actions: {
                authorize: async (code: string) => {
                    const token = await getToken()
                    await query({
                        endpoint: '/users/authorize',
                        token,
                        method: 'POST',
                        body: { code },
                    })
                    await refetch()
                    await push(PATHS.ROOT)
                },
                unauthorize: async () => {
                    const token = await getToken()
                    await query({
                        endpoint: '/users/authorize',
                        token,
                        method: 'DELETE',
                    })
                    await refetch()
                    notifications.show({ message: 'Succesfully revoked DigitalOcean authorization' })
                },
            },
        }),
        [cachedData, error, isLoaded, isLoading, userId],
    )

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserContext
