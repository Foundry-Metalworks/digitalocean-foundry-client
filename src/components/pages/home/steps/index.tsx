import React, { useEffect, useState } from 'react'

import { SignUpButton, useAuth } from '@clerk/nextjs'
import { Button, rem, Select, Stack, Stepper } from '@mantine/core'
import { useRouter } from 'next/router'

import Section from '@/components/pages/home/section'
import DOSetup from '@/components/shared/digitalocean-setup'
import PanelDropdown from '@/components/shared/panel-dropdown'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/use-user'

import styles from './styles.module.scss'

const Steps: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [isDM, setIsDM] = useState(true)
    const { isSignedIn } = useAuth()
    const { push } = useRouter()
    const { data } = useUser()

    useEffect(() => {
        if (data?.servers.length) setActiveStep(isDM ? 3 : 2)
        else if (isDM && data?.authorized) setActiveStep(2)
        else if (isSignedIn) setActiveStep(1)
    }, [data?.authorized, isSignedIn, data?.servers, isDM])

    return (
        <Section title="Setup Guide">
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
                active={activeStep}
                onStepClick={(step) => setActiveStep(step)}
                breakpoint="sm"
                className={styles.stepper}
                maw={!isDM ? '40rem' : undefined}
                m="0 auto"
            >
                <Stepper.Step label="Step 1" description="Create Metalworks Account">
                    <SignUpButton redirectUrl={PATHS.ROOT}>
                        <Button radius="xl" size="md">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </Stepper.Step>
                {isDM ? (
                    <Stepper.Step label="Step 2" description="Connect DigitalOcean Account" disabled={!isSignedIn}>
                        <DOSetup />
                    </Stepper.Step>
                ) : null}
                <Stepper.Step
                    label={isDM ? 'Step 3' : 'Step 2'}
                    description={`${isDM ? 'Create' : 'Join'} Metalworks Server`}
                    disabled={!data?.authorized}
                >
                    <Button radius="xl" size="md" onClick={() => push(`${PATHS.SETUP}?type=${isDM ? 'dm' : 'player'}`)}>
                        {isDM ? 'Create' : 'Join'} Metalworks Server
                    </Button>
                </Stepper.Step>
                <Stepper.Completed>
                    <Stack c>
                        {"Looks like you're a pro already!"}
                        <PanelDropdown text="Panel" />
                    </Stack>
                </Stepper.Completed>
            </Stepper>
        </Section>
    )
}

export default Steps
