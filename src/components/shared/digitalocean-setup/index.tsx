import React, { useEffect, useState } from 'react'

import { Badge, Button, Group, rem, Space, Stack, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import process from 'process'

import IconBrandDigitalOcean from '@/components/icons/digital-ocean'
import Loading from '@/components/shared/loading'
import { useUser } from '@/hooks/use-user'

const REFERRAL_LINK =
    'https://www.digitalocean.com/?refcode=d69d3faf8632&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge'

const DOSetup: React.FC = () => {
    const [setupStage, setSetupStage] = useState<number | undefined>(undefined)
    const [hasDOAcc, setHasDOAcc] = useState<boolean | undefined>(undefined)
    const { isLoading, data } = useUser()
    const isConnected = !!data?.authorized

    useEffect(() => {
        if (data?.authorized != undefined) {
            setSetupStage(data.authorized ? 3 : 0)
        }
    }, [data?.authorized])

    const updateData = (hasDoAcc: boolean, stage: number) => {
        setHasDOAcc(hasDoAcc)
        setSetupStage(stage)
    }

    const Stage0 = () => (
        <>
            <Title order={4}>Do you have a DigitalOcean Account?</Title>
            <Group mx="auto">
                <Button radius="xl" size="md" component="a" onClick={() => updateData(true, 1)}>
                    Yes
                </Button>
                <Button radius="xl" size="md" component="a" onClick={() => updateData(false, 1)}>
                    No
                </Button>
            </Group>
        </>
    )

    const Stage1 = () => {
        return (
            <Button
                radius="xl"
                size="md"
                component="a"
                href={hasDOAcc ? process.env.NEXT_PUBLIC_DO_URL : REFERRAL_LINK}
                target={hasDOAcc ? undefined : '_blank'}
                onClick={() => (hasDOAcc ? setSetupStage(3) : setSetupStage(2))}
                disabled={isLoading}
            >
                <IconBrandDigitalOcean size={16} style={{ marginRight: rem(12) }} />
                {hasDOAcc ? 'Connect DigitalOcean' : 'Create DigitalOcean Account'}
            </Button>
        )
    }

    const Stage2 = () => (
        <>
            <Title order={4}>Account Created?</Title>
            <Group mx="auto">
                <Button radius="xl" size="md" component="a" onClick={() => updateData(true, 1)}>
                    Yes
                </Button>
                <Button radius="xl" size="md" component="a" onClick={() => updateData(false, 1)}>
                    No
                </Button>
            </Group>
        </>
    )

    const Stage3 = () => (
        <Badge radius="xl" size="xl" color="green" w="max-content" mx="auto">
            <IconBrandDigitalOcean size={18} style={{ marginRight: rem(12) }} />
            All Set!
        </Badge>
    )

    const SetupContent = () => {
        if (setupStage == undefined) return <Space h={32} />
        console.log('RENDER')
        switch (setupStage) {
            case 0:
                return <Stage0 />
            case 1:
                return <Stage1 />
            case 2:
                return <Stage2 />
            case 3:
                return <Stage3 />
        }
    }

    return (
        <Stack>
            <SetupContent />
        </Stack>
    )
}

export default DOSetup
