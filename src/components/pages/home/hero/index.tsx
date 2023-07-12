import React, { useMemo } from 'react'
import { Box, Button, Group, List, rem, Text, ThemeIcon, Title } from '@mantine/core'
import { IconBrandGithub, IconCheck } from '@tabler/icons-react'
import { NextPage } from 'next'

import Link from '@/components/kit/link'
import FoundryLogo from '@/components/shared/foundry-logo'
import PanelDropdown from '@/components/shared/panel-dropdown'
import { BREAKPOINTS, PATHS } from '@/constants'

import styles from './styles.module.scss'
import { HomeProps } from '@/components/pages/home/types'
import { useViewportSize } from '@mantine/hooks'

const HomepageHero: NextPage<HomeProps> = ({ isSignedIn = false, hasServer = false }) => {
    const { width } = useViewportSize()

    const checkIcon = (
        <ThemeIcon size={20} radius="xl">
            <IconCheck size={rem(12)} stroke={1.5} />
        </ThemeIcon>
    )

    const HeroButton = useMemo(() => {
        if (hasServer) {
            return <PanelDropdown text="Go To Panel" />
        }
        return (
            <Link href={isSignedIn ? PATHS.SETUP : PATHS.SIGN_IN}>
                <Button radius="xl" size="md">
                    Get started
                </Button>
            </Link>
        )
    }, [isSignedIn, hasServer])

    return (
        <Group
            className={styles.hero}
            py="16px"
            mb="32px"
            w={width >= BREAKPOINTS.TABLET ? '100%' : '80%'}
            style={width < BREAKPOINTS.TABLET ? { flexDirection: 'column-reverse' } : undefined}
            spacing={width < BREAKPOINTS.TABLET ? '1rem' : 0}
            mx="auto"
        >
            <Box
                w={width >= BREAKPOINTS.TABLET ? '50%' : '100%'}
                ta={width <= BREAKPOINTS.TABLET ? 'center' : undefined}
            >
                <Title>Metalworks: Open-Source FoundryVTT Hosting</Title>
                <Text color="dimmed" mt="md">
                    Get your FoundryVTT server up-and-running in no time. Metalworks is a toolkit to help you easily
                    host your FoundryVTT server on DigitalOcean. And best of all, its free!
                </Text>
                <List mt={30} spacing="sm" size="sm" icon={checkIcon} ta="left">
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
                <Group mt={30} position={width <= BREAKPOINTS.TABLET ? 'center' : undefined}>
                    {HeroButton}
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
            </Box>
            <Box w={width >= BREAKPOINTS.TABLET ? '40%' : '100%'}>
                <FoundryLogo size="75%" />
            </Box>
        </Group>
    )
}

export default HomepageHero
