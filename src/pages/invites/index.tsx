import React from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, LoadingOverlay, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'

import Loading from '@/components/kit/loading'
import RedirectTo from '@/components/kit/redirect'
import MainLayout from '@/components/layouts/main'
import { PATHS } from '@/constants'
import useInvites from '@/hooks/use-invites'

const Invites: NextPage = () => {
    const { userId } = useAuth()
    const {
        actions: { acceptInvite },
        isLoading,
        data,
    } = useInvites(userId || '')
    const invites = data || []

    if (!isLoading && !invites.length) return <RedirectTo path={PATHS.ROOT} />

    return (
        <Stack ta="center">
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

export default Invites
