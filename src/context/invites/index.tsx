import React, { createContext } from 'react'

import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'

import { query, useQuery } from '@/api/network'
import { InvitesDispatch, InvitesType } from '@/context/invites/types'
import { ContextType } from '@/types'

type InviteContextType = ContextType<InvitesType | null, InvitesDispatch>
type InviteProviderProps = React.PropsWithChildren<{ user: string }>

const InvitesContext = createContext<InviteContextType>({
    data: null,
    isLoading: false,
    dispatch: {
        acceptInvite: () => undefined,
    },
})

export const InvitesProvider: React.FC<InviteProviderProps> = ({ children, user }) => {
    const { getToken } = useAuth()
    const { status, data, error } = useQuery<InvitesType>(
        {
            endpoint: `/invites`,
        },
        [user],
    )

    const value: InviteContextType = {
        isLoading: status == 'idle' || status == 'loading',
        data: data || null,
        error: error || undefined,
        dispatch: {
            acceptInvite: async (inviteId: number) => {
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
        },
    }

    return <InvitesContext.Provider value={value}>{children}</InvitesContext.Provider>
}

export default InvitesContext
