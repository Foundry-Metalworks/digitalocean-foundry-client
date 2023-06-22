import { useCallback, useMemo } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'

import { query, useQuery } from '@/api/network'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/use-user'
import { PermissionsType, UseDataType } from '@/types'

export interface ServerType {
    name: string
    permissions: PermissionsType
    users: ServerUserType[]
}

export interface ServerUserType {
    name: string
    permissions: PermissionsType
}

export interface ServerDispatch {
    create: (serverId: string) => void
    joinByToken: (inviteToken: string) => void
}

const useServer = (server: string | null): UseDataType<ServerType, ServerDispatch> => {
    const { getToken } = useAuth()
    const { push } = useRouter()
    const { refetch: refetchUser, isLoading: userLoading } = useUser()

    const { isFetching, data, error, refetch } = useQuery<ServerType>(
        {
            endpoint: `/servers/${server}`,
            enabled: server != null,
        },
        [server],
    )
    const isLoading = server != null ? userLoading || isFetching : false

    const create = useCallback(
        async (serverId: string) => {
            const token = await getToken()
            await query({
                endpoint: '/servers/create',
                method: 'POST',
                body: { serverId },
                token,
            })
            await refetchUser()
            await push(PATHS.ROOT)
            notifications.show({ message: `Created Server: ${serverId}` })
        },
        [getToken, refetchUser, push],
    )

    const joinByToken = useCallback(
        async (inviteToken: string) => {
            const authToken = await getToken()
            await query({
                endpoint: '/servers/join',
                method: 'POST',
                body: { inviteToken },
                token: authToken,
            })
            await refetchUser()
            await push(PATHS.ROOT)
            notifications.show({ message: 'Joined Server Successfully' })
        },
        [getToken, refetchUser, push],
    )

    return useMemo(
        () => ({
            isLoading,
            data,
            error,
            refetch,
            actions: {
                create,
                joinByToken,
            },
        }),
        [isLoading, data, error, refetch, create, joinByToken],
    )
}

export default useServer
