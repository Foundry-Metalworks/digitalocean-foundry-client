import React from 'react'
import { useAuth } from '@clerk/nextjs'
import useInvites from '@/hooks/api/use-invites'
import { Button, LoadingOverlay, Stack, Text } from '@mantine/core'
import DashboardSection from '@/components/pages/dashboard/section'
import { DashboardSectionEnum } from '@/context/dashboard'

const Invites: React.FC = () => {
    const { userId } = useAuth()
    const {
        actions: { acceptInvite },
        isLoading,
        data,
    } = useInvites(userId || '')
    const invites = data || []

    return (
        <DashboardSection section={DashboardSectionEnum.INVITES} title="Your Invites">
            <Stack ta="center">
                <LoadingOverlay visible={isLoading} />
                {invites.map((invite) => (
                    <div key={`invite-${invite.id}`}>
                        <Button w="200px" variant="outline" onClick={() => acceptInvite(invite.id)}>
                            {invite.server}
                        </Button>
                    </div>
                ))}
                {!invites.length && <Text>No invites right now</Text>}
            </Stack>
        </DashboardSection>
    )
}

export default Invites
