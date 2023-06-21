import React, { PropsWithChildren } from 'react'

import { useAuth, UserButton } from '@clerk/nextjs'
import { Box, Container, Group, Header, Menu, Space, Text } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

import Dropdown from '@/components/shared/dropdown'
import FoundryLogo from '@/components/shared/foundry-logo'
import Link from '@/components/shared/link'
import Loading from '@/components/shared/loading'
import ThemeSwitch from '@/components/shared/theme-switch'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/use-user'

import styles from './styles.module.scss'

export interface MainLayoutProps extends PropsWithChildren {
    showLogo?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogo = true }: MainLayoutProps) => {
    const { isSignedIn, isLoaded } = useAuth()
    const { data } = useUser()
    const servers = data?.servers || []

    if (!isLoaded) {
        return (
            <Box display="flex" style={{ justifyItems: 'center', alignItems: 'center' }} h="100vh">
                <Loading />
            </Box>
        )
    }

    return (
        <div>
            <Header height="4rem" px="2rem" mb="2rem" pos="sticky">
                <Group h="inherit" pos="relative" style={{ justifyContent: 'space-between' }}>
                    <Group left>
                        <Link href={PATHS.ROOT} legacyBehavior={false}>
                            <FoundryLogo size="48px" withText />
                        </Link>
                        {isSignedIn && (
                            <Dropdown label="Setup" labelType="link">
                                <Link href={`${PATHS.SETUP}?type=dm`}>
                                    <Text w="100%" my={0} py={0}>
                                        DM
                                    </Text>
                                </Link>
                                <Link href={`${PATHS.SETUP}?type=player`}>
                                    <Text w="100%" my={0} py={0}>
                                        Player
                                    </Text>
                                </Link>
                            </Dropdown>
                        )}
                        {isSignedIn && !!servers.length && (
                            <Dropdown label="Go To Panel" labelType="link" z>
                                {servers.map((s) => (
                                    <Link key={`button-server-link-${s.name}`} href={`${PATHS.PANEL}/${s.name}`}>
                                        <Text w="100%" my={0} py={0}>
                                            {s.name}
                                        </Text>
                                    </Link>
                                ))}
                            </Dropdown>
                        )}
                    </Group>
                    <Group right>
                        {!isSignedIn && <Link href={PATHS.SIGN_IN}>Sign In</Link>}
                        <ThemeSwitch />
                        {isSignedIn && (
                            <UserButton
                                appearance={{ elements: { avatarBox: { width: '2.5rem', height: '2.5rem' } } }}
                            />
                        )}
                    </Group>
                </Group>
            </Header>
            <Container display="flex" className={styles.mainContent} maw="100%" w="60rem">
                <FoundryLogo size="256px" hidden={!showLogo} center />
                <Space h="3rem" />
                {children}
            </Container>
        </div>
    )
}

export default MainLayout
