import React from 'react'

import { SignUpButton, useAuth } from '@clerk/nextjs'
import { Box, Button, Group, List, rem, Text, ThemeIcon, Title } from '@mantine/core'
import { IconBrandGithub, IconCheck } from '@tabler/icons-react'
import { NextPage } from 'next'

import FoundryLogo from '@/components/shared/foundry-logo'
import Link from '@/components/shared/link'
import { PATHS } from '@/constants'

import styles from './styles.module.scss'

const HomepageHero: NextPage = () => {
    const checkIcon = (
        <ThemeIcon size={20} radius="xl">
            <IconCheck size={rem(12)} stroke={1.5} />
        </ThemeIcon>
    )
    const { isSignedIn } = useAuth()

    const heroButton = (
        <Button radius="xl" size="md">
            {!!isSignedIn ? 'Go To Panel' : 'Get started'}
        </Button>
    )
    return (
        <Box className={styles.hero} mb="32px">
            <div>
                <Title>Metalworks: Open-Source FoundryVTT Hosting</Title>
                <Text color="dimmed" mt="md">
                    Get your FoundryVTT server up-and-running in no time. Metalworks is a toolkit to help you easily
                    host your FoundryVTT server on DigitalOcean. And best of all, its free!
                </Text>
                <List mt={30} spacing="sm" size="sm" icon={checkIcon}>
                    <List.Item>
                        <b>Shareable</b> – give players easy access to start/stop your FoundryVTT server. Or don&apost,
                        the choice is yours!
                    </List.Item>
                    <List.Item>
                        <b>Open Source</b> – all packages have MIT license, Metalworks is yours to use as you see fit
                    </List.Item>
                    <List.Item>
                        <b>Pay What You Use</b> – the average Metalworks user pays DigitalOcean just{' '}
                        <strong>$0.15 USD</strong> monthly
                    </List.Item>
                </List>
                <Group mt={30}>
                    {!!isSignedIn ? (
                        <Link href={PATHS.PANEL} legacyBehavior>
                            {heroButton}
                        </Link>
                    ) : (
                        <SignUpButton>{heroButton}</SignUpButton>
                    )}
                    <Button
                        variant="default"
                        radius="xl"
                        size="md"
                        onClick={() => window.open('https://github.com/Foundry-Metalworks/metalworks-client')}
                    >
                        <IconBrandGithub size={rem(16)} style={{ marginRight: rem(4) }} />
                        Source code
                    </Button>
                </Group>
            </div>
            <FoundryLogo size={rem(384)} />
        </Box>
    )
}

export default HomepageHero
