import React, { useContext, useState } from 'react'

import { Button, Group, rem, Select, Space, Stack, Text } from '@mantine/core'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import MainLayout from '@/components/layouts/main'
import { PATHS } from '@/constants'
import ServerContext, { ServerProvider } from '@/context/server'
import CreateSetup from '@/pages/setup/create-setup'
import JoinSetup from '@/pages/setup/join-setup'

type SetupType = 'dm' | 'player'

const UnwrappedSetup: NextPage = () => {
    const { query, push } = useRouter()
    const initialType: 'dm' | 'player' = (query.type as SetupType | undefined) || 'dm'
    const [setupType, setSetupType] = useState<'dm' | 'player'>(initialType)
    const {
        dispatch: { create, joinByToken },
    } = useContext(ServerContext)

    return (
        <Stack maw="30rem" m="0 auto">
            <Group m="0 auto">
                <Text>I am a:</Text>
                <Select
                    value={setupType}
                    data={[
                        { value: 'dm', label: 'Dungeon Master' },
                        { value: 'player', label: 'Player' },
                    ]}
                    onChange={(value) => setSetupType(value as SetupType)}
                    w={rem(320)}
                />
            </Group>
            <Space h={rem(16)} />
            {setupType == 'dm' ? <CreateSetup onSubmit={create} /> : <JoinSetup onSubmit={joinByToken} />}
            <Space h={rem(32)} />
            <Button component="a" color="red" onClick={() => push(PATHS.ROOT)}>
                Return Home
            </Button>
        </Stack>
    )
}

const Setup: NextPage = () => {
    return (
        <ServerProvider>
            <MainLayout>
                <UnwrappedSetup />
            </MainLayout>
        </ServerProvider>
    )
}

export default Setup
