import React from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'

import MainLayout from '@/components/layouts/main'
import Loading from '@/components/shared/loading'
import RedirectTo from '@/components/shared/redirect'
import { PATHS } from '@/constants'
import useInvites from '@/hooks/use-invites'

const Invites: NextPage = () => {
    const { userId } = useAuth()
    const { isLoading, invites, actions } = useInvites(userId || '')
    const { acceptInvite } = actions

    if (isLoading) return <Loading />
    if (!invites.length) return <RedirectTo path={PATHS.HOME} />

    return (
        <MainLayout showLogo>
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
        </MainLayout>
    )
}

export default Invites
