import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/router'

import { query, useQuery } from '@/api/network'
import { PATHS } from '@/constants'
import { PermissionsType, UseDataType } from '@/types'

export interface UserType {
    email: string
    name: string
    id: string
    servers: UserServerType[]
    authorized: boolean
}

export interface UserServerType {
    name: string
    permissions: PermissionsType
}

type UserActions = {
    authorize: (code: string) => void
}

export const useUser = (): UseDataType<UserType, UserActions> => {
    const { isSignedIn, isLoaded, userId, getToken } = useAuth()
    const { push } = useRouter()

    const shouldFetchUser = isLoaded && !!isSignedIn
    const { isLoading, data, error, refetch } = useQuery<UserType>(
        'getUser',
        {
            endpoint: '/users/me',
            enabled: shouldFetchUser,
        },
        [userId],
    )

    return {
        isLoading: !isLoaded || isLoading,
        data: userId ? data : undefined,
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
        },
    }
}
