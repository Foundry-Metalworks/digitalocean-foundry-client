import React from 'react'
import DashboardSection from '@/components/pages/dashboard/section'
import { DashboardSectionEnum } from '@/context/dashboard'
import DigitaloceanSetup from '@/components/shared/digitalocean-setup'
import { Button, Image, Stack, Text } from '@mantine/core'
import { useUser } from '@/hooks/use-user'
import IconBrandDigitalOcean from '@/components/icons/digital-ocean'
import { modals } from '@mantine/modals'
import { useAuth } from '@clerk/nextjs'

const Digitalocean: React.FC = () => {
    const {
        data: user,
        actions: { unauthorize },
    } = useUser()
    const { getToken } = useAuth()
    const isAuthorized = !!user?.authorized

    const confirmationModal = () => {
        modals.openConfirmModal({
            title: 'Delete your profile',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to unauthorize DigitalOcean? Without DigitalOcean auth you will not be able to
                    access any game you&apos;ve set up from Metalworks.
                </Text>
            ),
            labels: { confirm: 'Unauthorize', cancel: 'Nevermind' },
            confirmProps: { color: 'red' },
            onConfirm: unauthorize,
        })
    }

    return (
        <DashboardSection section={DashboardSectionEnum.DIGITALOCEAN} title="DigitalOcean Connectivity">
            <Image mx="auto" src="/digitalocean.svg" maw="320px" />
            <br />
            <Stack w="max-content" mx="auto">
                <DigitaloceanSetup />
                {isAuthorized && (
                    <>
                        <br />
                        <Button color="red" component="a" onClick={confirmationModal}>
                            Revoke <IconBrandDigitalOcean size={14} style={{ margin: '0 4px' }} /> Authorization
                        </Button>
                    </>
                )}
            </Stack>
        </DashboardSection>
    )
}

export default Digitalocean
