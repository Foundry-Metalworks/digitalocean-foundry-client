import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'

import { query, useQuery } from '@/api/network'
import { PATHS } from '@/constants'
import { ServerDispatch, ServerType } from '@/context/server/types'
import UserContext from '@/context/user'
import { ContextType } from '@/types'

type ServerContextType = ContextType<ServerType | null, ServerDispatch>

const ServerContext = createContext<ServerContextType>({
    data: null,
    isLoading: false,
    dispatch: {
        create: () => undefined,
        joinByToken: () => undefined,
    },
})

type ServerProviderProps = PropsWithChildren<{ server?: string }>

export const ServerProvider: React.FC<ServerProviderProps> = ({ children, server }) => {
    const { getToken } = useAuth()
    const { push } = useRouter()
    const { isLoading } = useContext(UserContext)
    const { isFetching, data, error, refetch } = useQuery<ServerType>(
        {
            endpoint: `/servers/${server}`,
            enabled: server != undefined,
        },
        [server],
    )

    const loading = !!server ? isLoading || isFetching : false
    const value: ServerContextType = useMemo(
        () => ({
            isLoading: loading,
            data: loading ? null : data || null,
            error: error || undefined,
            dispatch: {
                create: async (serverId: string) => {
                    const token = await getToken()
                    await query({
                        endpoint: '/servers/create',
                        method: 'POST',
                        body: { serverId },
                        token,
                    })
                    await refetch()
                    await push(PATHS.ROOT)
                    notifications.show({ message: `Created Server: ${serverId}` })
                },
                joinByToken: async (inviteToken: string) => {
                    const authToken = await getToken()
                    await query({
                        endpoint: '/servers/join',
                        method: 'POST',
                        body: { inviteToken },
                        token: authToken,
                    })
                    await refetch()
                    await push(PATHS.ROOT)
                    notifications.show({ message: 'Joined Server Successfully' })
                },
            },
        }),
        [server, loading, error],
    )

    return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
}

export default ServerContext
