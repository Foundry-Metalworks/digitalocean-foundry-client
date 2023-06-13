import React, { useContext } from 'react'

import { Button, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'

import RedirectTo from '@/components/redirect'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

const Invites: NextPage = () => {
    const {
        data: {
            isSetup,
            user: { invites },
        },
        dispatch: { acceptInvite },
    } = useContext(UserContext)

    if (isSetup) return <RedirectTo path={PATHS.HOME} />

    return (
        <Stack>
            <Title>Server Invites</Title>
            <Text>Click to Accept</Text>
            <br />
            {invites.map((invite) => (
                <div key={`invite-${invite}`}>
                    <Button type="button" fullWidth onClick={() => acceptInvite(invite)}>
                        {invite}
                    </Button>
                </div>
            ))}
        </Stack>
    )
}

export default Invites
