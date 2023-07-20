import React, { useEffect, useState } from 'react'
import { Button, rem, Select, Stack, Stepper } from '@mantine/core'
import { useRouter } from 'next/router'

import Section from '@/components/pages/home/section'
import DOSetup from '@/components/shared/digitalocean-setup'
import PanelDropdown from '@/components/shared/panel-dropdown'
import { PATHS } from '@/constants'

import styles from './styles.module.scss'
import { HomeProps } from '@/components/pages/home/types'
import NextLink from 'next/link'

const getSetupStep = (isSignedIn: boolean, isAuthorized: boolean, hasServer: boolean, isDM: boolean) => {
    if (!isSignedIn) return 0
    if (isDM) {
        if (!isAuthorized) return 1
        if (!hasServer) return 2
        return 3
    } else {
        if (!hasServer) return 1
        return 2
    }
}

const Steps: React.FC<HomeProps> = ({ isSignedIn, isAuthorized, hasServer, isLoading }) => {
    const [isDM, setIsDM] = useState(true)
    const { push } = useRouter()
    const [activeStep, setActiveStep] = useState<number | undefined>(undefined)

    useEffect(() => {
        const setupStep = getSetupStep(isSignedIn, isAuthorized, hasServer, isDM)
        if (setupStep != activeStep) setActiveStep(setupStep)
    }, [hasServer, isSignedIn, isAuthorized, isDM, isLoading])

    return (
        <Section title="Setup Guide" id="setup">
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
                active={activeStep || 0}
                onStepClick={(step) => setActiveStep(step)}
                breakpoint="sm"
                mx="auto"
                maw={800}
                mih={180}
            >
                <Stepper.Step label="Step 1" description="Create Metalworks Account" loading={isLoading}>
                    {!isLoading && (
                        <NextLink href={`${PATHS.SIGN_UP}?redirectUrl=${PATHS.HOME}`}>
                            <Button radius="xl" size="md">
                                Sign Up
                            </Button>
                        </NextLink>
                    )}
                </Stepper.Step>
                {isDM ? (
                    <Stepper.Step
                        label="Step 2"
                        description="Connect DigitalOcean Account"
                        disabled={!isSignedIn}
                        loading={isLoading}
                    >
                        <DOSetup />
                    </Stepper.Step>
                ) : null}
                <Stepper.Step
                    label={isDM ? 'Step 3' : 'Step 2'}
                    description={`${isDM ? 'Create' : 'Join'} Metalworks Server`}
                    disabled={!isAuthorized}
                    loading={isLoading}
                >
                    {!isLoading && (
                        <Button
                            radius="xl"
                            size="md"
                            onClick={() => push(`${PATHS.SETUP}?type=${isDM ? 'dm' : 'player'}`)}
                        >
                            {isDM ? 'Create' : 'Join'} Metalworks Server
                        </Button>
                    )}
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
