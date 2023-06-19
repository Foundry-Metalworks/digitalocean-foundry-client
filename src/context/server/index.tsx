import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'

import { query, useQuery } from '@/api/network'
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

export const ServerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { getToken } = useAuth()
    const { data: userData } = useContext(UserContext)
    const server = userData?.servers.length ? userData?.servers[0].name : undefined
    const { status, data, error } = useQuery<ServerType>(
        {
            endpoint: `/servers/${server}`,
            enabled: !!server,
        },
        [server],
    )

    const loading = !server || status == 'idle' || status == 'loading'
    const value: ServerContextType = useMemo(
        () => ({
            isLoading: loading,
            data: loading ? null : data || null,
            error: error || undefined,
            dispatch: {
                create: async (serverId: string, apiToken: string) => {
                    const token = await getToken()
                    await query({
                        endpoint: '/servers/create',
                        method: 'POST',
                        body: { serverId, apiToken },
                        token,
                    })
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
                    notifications.show({ message: 'Joined Server Successfully' })
                },
            },
        }),
        [server, loading, error],
    )

    return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
}

export default ServerContext
