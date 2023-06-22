import React, { useEffect, useState } from 'react'

import { Button, Group, rem, Select, Space, Stack, Text } from '@mantine/core'
import { useFocusTrap } from '@mantine/hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Link from '@/components/kit/link'
import { PATHS } from '@/constants'
import useServer from '@/hooks/use-server'
import { useUser } from '@/hooks/use-user'
import CreateSetup from '@/pages/setup/create-setup'
import JoinSetup from '@/pages/setup/join-setup'

type SetupType = 'dm' | 'player'

const Setup: NextPage = () => {
    const { query, push } = useRouter()
    const { data } = useUser()
    const queryType = query.type as 'dm' | 'player'
    const [setupType, setSetupType] = useState<'dm' | 'player' | undefined>(undefined)
    const {
        actions: { create, joinByToken },
    } = useServer(null)
    const focusTrapRef = useFocusTrap(data?.authorized)

    useEffect(() => {
        if (setupType != queryType) setSetupType(queryType)
    }, [queryType])

    return (
        <Stack maw="30rem" m="0 auto" ref={focusTrapRef}>
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
            <Space h={rem(12)} />
            {setupType == 'dm' ? <CreateSetup onSubmit={create} /> : <JoinSetup onSubmit={joinByToken} />}
            <Space h={rem(24)} />
            <Link href={PATHS.ROOT} legacyBehavior>
                <Button component="a" color="red" onClick={() => push(PATHS.ROOT)}>
                    Return Home
                </Button>
            </Link>
        </Stack>
    )
}

export default Setup
