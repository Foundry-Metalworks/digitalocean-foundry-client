import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'
import { router } from 'next/client'
import { useRouter } from 'next/router'

import { query, useQuery } from '@/api/network'
import { ServerStatusType } from '@/types'

interface InstanceApi {
    isFetching: boolean
    instanceStatus: ServerStatusType | undefined
    actions: {
        startServer: () => Promise<void>
        stopServer: () => Promise<void>
        saveServer: () => Promise<void>
        goToServer: () => Promise<void>
        updateStatus: () => Promise<void>
    }
}

export const useInstance = (serverId: string | undefined): InstanceApi => {
    const { getToken } = useAuth()
    const [isFetching, setIsFetching] = useState(false)

    console.log('serverId: ' + serverId)
    const { data, isLoading, refetch } = useQuery<{ status: ServerStatusType }>(
        {
            endpoint: `/instance/${serverId}/status`,
            enabled: !!serverId,
            refetchInterval: 10000,
            refetchOnRevisit: true,
        },
        [serverId],
    )

    const updateStatus = useCallback(async () => {
        await refetch()
    }, [serverId, refetch])

    const goToServer = useCallback(async () => {
        const token = await getToken()
        notifications.show({ message: 'Navigating to Server' })
        setIsFetching(true)
        const { ip } = await query<{ ip: string }>({ endpoint: `/instance/${serverId}/ip`, token })
        setIsFetching(false)
        window.open(ip, '_blank')
    }, [serverId])

    const startServer = useCallback(async () => {
        const token = await getToken()
        notifications.show({ message: 'Starting Server' })
        setIsFetching(true)
        await query({ endpoint: `/instance/${serverId}/start`, method: 'POST', token })
        setIsFetching(false)
        await updateStatus()
    }, [serverId])

    const stopServer = useCallback(async () => {
        const token = await getToken()
        notifications.show({ message: 'Stopping Server' })
        setIsFetching(true)
        await query({ endpoint: `/instance/${serverId}/stop`, method: 'POST', token })
        setIsFetching(false)
        await updateStatus()
    }, [serverId])

    const saveServer = useCallback(async () => {
        const token = await getToken()
        notifications.show({ message: 'Saving Server' })
        await query({ endpoint: `/instance/${serverId}/save`, method: 'POST', token })
        setIsFetching(false)
    }, [serverId])

    const value = useMemo(
        () => ({
            isFetching: isFetching || isLoading,
            instanceStatus: data?.status,
            actions: { goToServer, startServer, stopServer, saveServer, updateStatus },
        }),
        [isFetching, data?.status, serverId],
    )

    return value
}
