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

type ServerProviderProps = PropsWithChildren<{ needsServer?: boolean }>

export const ServerProvider: React.FC<ServerProviderProps> = ({ children, needsServer = false }) => {
    const { getToken } = useAuth()
    const { push } = useRouter()
    const { data: userData, isLoading: userLoading } = useContext(UserContext)
    const server = userData?.servers.length ? userData?.servers[0].name : undefined
    const { isFetching, data, error } = useQuery<ServerType>(
        {
            endpoint: `/servers/${server}`,
            enabled: !!server,
        },
        [server],
    )

    const loading = needsServer ? userLoading || isFetching : false
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
                    notifications.show({ message: `Created Server: ${serverId}` })
                    await push(PATHS.HOME)
                },
                joinByToken: async (inviteToken: string) => {
                    const authToken = await getToken()
                    await query({
                        endpoint: '/servers/join',
                        method: 'POST',
                        body: { inviteToken },
                        token: authToken,
                    })
                    notifications.show({ message: 'Joined Server Successfully' })
                    await push(PATHS.HOME)
                },
            },
        }),
        [server, userLoading, isFetching, error],
    )

    return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
}

export default ServerContext
