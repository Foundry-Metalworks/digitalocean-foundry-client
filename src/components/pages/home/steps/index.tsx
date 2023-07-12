import React, { useEffect, useState } from 'react'
import { Button, LoadingOverlay, rem, Select, Stack, Stepper } from '@mantine/core'
import { useRouter } from 'next/router'

import Section from '@/components/pages/home/section'
import DOSetup from '@/components/shared/digitalocean-setup'
import PanelDropdown from '@/components/shared/panel-dropdown'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/use-user'

import styles from './styles.module.scss'
import { HomeProps } from '@/components/pages/home/types'
import NextLink from 'next/link'

const getSetupStep = (isSignedIn: boolean, isAuthorized: boolean, hasServer: boolean, isDM: boolean) => {
    if (hasServer) {
        return isDM ? 3 : 2
    }
    if (isDM && isAuthorized) return 2
    if (isSignedIn) return 1
    return 0
}

const Steps: React.FC<HomeProps> = ({ isSignedIn, isAuthorized, hasServer }) => {
    const [isDM, setIsDM] = useState(true)
    const { push } = useRouter()
    const { isLoading } = useUser()
    const initialStep = getSetupStep(isSignedIn, isAuthorized, hasServer, isDM)
    const [activeStep, setActiveStep] = useState(initialStep)

    useEffect(() => {
        const setupStep = getSetupStep(isSignedIn, isAuthorized, hasServer, isDM)
        if (setupStep != activeStep) setActiveStep(setupStep)
    }, [hasServer, isSignedIn, isAuthorized, isDM])

    return (
        <Section title="Setup Guide">
            <LoadingOverlay visible={isLoading} />
            <Select
                defaultValue="dm"
                data={[
                    { value: 'dm', label: 'Dungeon Master' },
                    { value: 'player', label: 'Player' },
                ]}
                onChange={(value) => setIsDM(value === 'dm')}
                mb="2rem"
                w={rem(320)}
                mx="auto"
            />
            <Stepper
                className={styles.stepper}
                active={activeStep}
                onStepClick={(step) => setActiveStep(step)}
                breakpoint="sm"
                maw={!isDM ? '40rem' : undefined}
                mx="auto"
                w="fit-content"
            >
                <Stepper.Step label="Step 1" description="Create Metalworks Account">
                    <NextLink href={`${PATHS.SIGN_UP}?redirectUrl=${PATHS.HOME}`}>
                        <Button radius="xl" size="md">
                            Sign Up
                        </Button>
                    </NextLink>
                </Stepper.Step>
                {isDM ? (
                    <Stepper.Step label="Step 2" description="Connect DigitalOcean Account" disabled={!isSignedIn}>
                        <DOSetup />
                    </Stepper.Step>
                ) : null}
                <Stepper.Step
                    label={isDM ? 'Step 3' : 'Step 2'}
                    description={`${isDM ? 'Create' : 'Join'} Metalworks Server`}
                    disabled={!isAuthorized}
                >
                    <Button radius="xl" size="md" onClick={() => push(`${PATHS.SETUP}?type=${isDM ? 'dm' : 'player'}`)}>
                        {isDM ? 'Create' : 'Join'} Metalworks Server
                    </Button>
                </Stepper.Step>
                <Stepper.Completed>
                    <Stack>
                        {"Looks like you're a pro already!"}
                        <PanelDropdown text="Panel" />
                    </Stack>
                </Stepper.Completed>
            </Stepper>
        </Section>
    )
}

export default Steps
