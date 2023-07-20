import React from 'react'
import { Button, LoadingOverlay, Stack, Text } from '@mantine/core'
import DashboardSection from '@/components/pages/dashboard/section'
import { DashboardSectionEnum } from '@/context/dashboard'
import { useUser } from '@/hooks/api/use-user'
import { PATHS } from '@/constants'
import Link from '@/components/kit/link'

const Games: React.FC = () => {
    const { isLoading, data } = useUser()
    const servers = data?.servers || []

    return (
        <DashboardSection section={DashboardSectionEnum.GAMES} title="Your Games">
            <Stack ta="center">
                <LoadingOverlay visible={isLoading} />
                {servers.map((server) => (
                    <Link href={`${PATHS.PANEL}${server.name}`} key={`server-${server.name}`}>
                        <Button type="button" variant="outline" w="200px">
                            {server.name}
                        </Button>
                    </Link>
                ))}
                {!servers.length && <Text>Not in any games right now</Text>}
                <br />
                <Link href={PATHS.SETUP}>
                    <Button w="200px">Create/Join a Game</Button>
                </Link>
            </Stack>
        </DashboardSection>
    )
}

export default Games
