import { useCallback, useMemo } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'

import { query, useQuery } from '@/api/network'

export interface InvitesType {
    isLoading: boolean
    invites: InviteType[]
    actions: InvitesDispatch
}

export interface InviteType {
    id: number
    server: string
}

export interface InvitesDispatch {
    acceptInvite: (id: number) => void
}

const useInvites = (userId: string): InvitesType => {
    const { getToken } = useAuth()
    const { data, isLoading } = useQuery<{ invites: InviteType[] }>(
        {
            endpoint: `/invites`,
            enabled: !!userId,
        },
        [userId],
    )

    const acceptInvite = useCallback(async (inviteId: number) => {
        const token = await getToken()
        await query({
            token,
            endpoint: '/invites/accept',
            method: 'POST',
            body: {
                inviteId,
            },
        })
        notifications.show({ message: 'Accepted Invite' })
    }, [])

    const value: InvitesType = useMemo(
        () => ({
            isLoading,
            invites: data?.invites || [],
            actions: { acceptInvite },
        }),
        [isLoading, userId],
    )

    return value
}

export default useInvites
