import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'

import { query } from '@/api/network'
import { ServerStatusType } from '@/types'

interface InstanceApi {
    isFetching: boolean
    instanceStatus: ServerStatusType
    actions: {
        startServer: () => Promise<void>
        stopServer: () => Promise<void>
        saveServer: () => Promise<void>
        goToServer: () => Promise<void>
        updateStatus: () => Promise<void>
    }
}

export const useInstanceApi = (serverId: string): InstanceApi => {
    const { getToken } = useAuth()
    const [isFetching, setIsFetching] = useState(false)
    const [instanceStatus, setInstanceStatus] = useState<ServerStatusType>('pending')

    const updateStatus = useCallback(async () => {
        const token = await getToken()
        const data = await query<{ status: ServerStatusType }>({
            endpoint: `/instance/${serverId}/status`,
            token,
        })
        const { status } = data
        setInstanceStatus(status)
    }, [serverId])

    useEffect(() => {
        updateStatus()
    }, [updateStatus])

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

    return useMemo(
        () => ({
            isFetching,
            instanceStatus,
            actions: { goToServer, startServer, stopServer, saveServer, updateStatus },
        }),
        [isFetching, instanceStatus, serverId],
    )
}
