import React, { useEffect, useState } from 'react'

import { Button, rem, Stepper } from '@mantine/core'
import { useRouter } from 'next/router'
import process from 'process'

import Section from '@/components/home/section'

type StepperProps = StepProps & React.RefAttributes<HTMLButtonElement>
type StepProps = {
    initialStep?: number
    children: React.ReactElement<StepperProps> | React.ReactElement<StepperProps>[]
}

import IconBrandDigitalOcean from '@/components/icons/digital-ocean'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/use-user'

import styles from './styles.module.scss'

import { SignUpButton, useAuth } from '@clerk/nextjs'

const Steps: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0)
    const { isSignedIn } = useAuth()
    const { push } = useRouter()
    const { data } = useUser()

    useEffect(() => {
        if (data?.servers) setActiveStep(3)
        else if (data?.authorized) setActiveStep(2)
        else if (isSignedIn) setActiveStep(1)
    }, [data?.authorized, isSignedIn, data?.servers])

    return (
        <Section title="Steps to Setup">
            <Stepper
                active={activeStep}
                onStepClick={(step) => setActiveStep(step)}
                breakpoint="sm"
                className={styles.stepper}
            >
                <Stepper.Step label="Step 1" description="Create Metalworks Account">
                    <SignUpButton redirectUrl={PATHS.HOME}>
                        <Button radius="xl" size="md">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </Stepper.Step>
                <Stepper.Step label="Step 2" description="Connect DigitalOcean Account">
                    <Button radius="xl" size="md" component="a" href={process.env.NEXT_PUBLIC_DO_URL}>
                        <IconBrandDigitalOcean size={16} style={{ marginRight: rem(4) }} />
                        Connect DigitalOcean
                    </Button>
                </Stepper.Step>
                <Stepper.Step label="Step 3" description="Create or Join Metalworks Server">
                    <Button radius="xl" size="md" onClick={() => push(PATHS.SETUP)}>
                        Create or Join Server
                    </Button>
                </Stepper.Step>
                <Stepper.Completed>{"Looks like you're a pro already!"}</Stepper.Completed>
            </Stepper>
        </Section>
    )
}

export default Steps
