import React, { useContext } from 'react'

import { Button, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'

import MainLayout from '@/components/layouts/main'
import InvitesContext, { InvitesProvider } from '@/context/invites'
import UserContext from '@/context/user'

const UnwrappedInvites: React.FC = () => {
    const {
        data,
        dispatch: { acceptInvite },
    } = useContext(InvitesContext)
    const invites = data?.invites || []

    return (
        <Stack>
            <Title>Server Invites</Title>
            <Text>Click to Accept</Text>
            <br />
            {invites.map((invite) => (
                <div key={`invite-${invite.id}`}>
                    <Button type="button" fullWidth onClick={() => acceptInvite(invite.id)}>
                        {invite.server}
                    </Button>
                </div>
            ))}
        </Stack>
    )
}

const Invites: NextPage = () => {
    const { data } = useContext(UserContext)
    return (
        <InvitesProvider user={data?.id as string}>
            <UnwrappedInvites />
        </InvitesProvider>
    )
}

export default Invites
