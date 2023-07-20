import React, { useMemo } from 'react'
import { Button, Grid, Group, List, rem, Text, ThemeIcon, Title } from '@mantine/core'
import { IconBrandGithub, IconCheck } from '@tabler/icons-react'
import { NextPage } from 'next'

import Link from '@/components/kit/link'
import FoundryLogo from '@/components/shared/foundry-logo'
import PanelDropdown from '@/components/shared/panel-dropdown'
import { BREAKPOINTS, PATHS } from '@/constants'

import styles from './styles.module.scss'
import { HomeProps } from '@/components/pages/home/types'
import { useViewportSize } from '@mantine/hooks'

const HomepageHero: NextPage<HomeProps> = ({ isSignedIn = false, hasServer = false, isLoading }) => {
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
                <Button radius="xl" size="md" loading={isLoading}>
                    {isLoading ? 'Loading...' : 'Get started'}
                </Button>
            </Link>
        )
    }, [isSignedIn, hasServer])

    return (
        <Grid
            className={styles.hero}
            py="16px"
            mb="32px"
            w={width >= BREAKPOINTS.TABLET ? '100%' : '80%'}
            style={width < BREAKPOINTS.TABLET ? { flexDirection: 'column-reverse' } : undefined}
            mx="auto"
        >
            <Grid.Col sm={12} md={6} ta={width <= BREAKPOINTS.TABLET ? 'center' : undefined}>
                <Title>Metalworks: Open-Source FoundryVTT Hosting</Title>
                <Text color="dimmed" mt="md">
                    Get your FoundryVTT server up-and-running in no time. Metalworks is a toolkit to help you easily
                    host your FoundryVTT server on DigitalOcean. And best of all, its free!
                </Text>
                <List mt={30} spacing="sm" size="sm" icon={checkIcon} ta="left">
                    <List.Item>
                        <b>Shareable</b> – give players easy access to start/stop your FoundryVTT server. Or don&apos;t,
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
            </Grid.Col>
            <Grid.Col md={6} sm={12} display="flex">
                <FoundryLogo size="75%" />
            </Grid.Col>
        </Grid>
    )
}

export default HomepageHero
