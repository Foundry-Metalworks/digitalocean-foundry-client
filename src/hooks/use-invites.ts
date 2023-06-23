import { useCallback, useMemo } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'

import { query, useQuery } from '@/api/network'
import { UseDataType } from '@/types'

export interface InviteType {
    id: number
    server: string
}

export interface InvitesDispatch {
    acceptInvite: (id: number) => void
}

const useInvites = (userId: string): UseDataType<InviteType[], InvitesDispatch> => {
    const { getToken } = useAuth()
    const { data, isLoading, error, refetch } = useQuery<{ invites: InviteType[] }>(
        'getInvites',
        {
            endpoint: `/invites`,
            enabled: !!userId,
        },
        [userId],
    )

    const acceptInvite = useCallback(
        async (inviteId: number) => {
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
        },
        [getToken],
    )

    return useMemo(
        () => ({
            isLoading,
            data: data?.invites || [],
            actions: { acceptInvite },
            error,
            refetch,
        }),
        [isLoading, userId, acceptInvite],
    )
}

export default useInvites
