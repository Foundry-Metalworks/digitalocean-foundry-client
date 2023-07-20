import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/router'

import { query, useQuery } from '@/api/network'
import { PATHS } from '@/constants'
import { PermissionsType, UseDataType } from '@/types'
import { notifications } from '@mantine/notifications'

export interface UserType {
    email: string
    name: string
    id: string
    imageUrl: string
    servers: UserServerType[]
    authorized: boolean
}

export interface UserServerType {
    name: string
    permissions: PermissionsType
}

type UserActions = {
    authorize: (code: string) => void
    unauthorize: () => void
}

interface UseUser {
    isSignedIn: boolean
    user: UserType | undefined
}

export const useUser = (): UseDataType<UserType, UserActions> => {
    const { userId, getToken, isLoaded } = useAuth()
    const { push } = useRouter()

    const { isLoading, data, error, refetch } = useQuery<UserType>(
        'getUser',
        {
            endpoint: '/users/me',
            enabled: !!userId,
        },
        [userId],
    )

    return {
        isLoading: !isLoaded || isLoading,
        data,
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
    }
}

export default useUser
