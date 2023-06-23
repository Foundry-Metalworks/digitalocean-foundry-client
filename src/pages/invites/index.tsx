import React from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'

import RedirectTo from '@/components/kit/redirect'
import { PATHS } from '@/constants'
import useInvites from '@/hooks/use-invites'
import { withAuthAndUser } from '@/util/server'

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

export const getServerSideProps = withAuthAndUser()

export default Invites
