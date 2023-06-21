import React, { PropsWithChildren } from 'react'

import { useAuth, UserButton } from '@clerk/nextjs'
import { Box, Container, Group, Header, Space } from '@mantine/core'

import FoundryLogo from '@/components/shared/foundry-logo'
import Link from '@/components/shared/link'
import Loading from '@/components/shared/loading'
import ThemeSwitch from '@/components/shared/theme-switch'
import { PATHS } from '@/constants'

import styles from './styles.module.scss'

export interface MainLayoutProps extends PropsWithChildren {
    showLogo?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogo = true }: MainLayoutProps) => {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded)
        return (
            <Box display="flex" style={{ justifyItems: 'center', alignItems: 'center' }} h="100vh">
                <Loading />
            </Box>
        )

    return (
        <div>
            <Header height="4rem" pl="1rem" pr="1rem" mb="2rem" pos="sticky">
                <Group spacing={20} h="inherit" pos="relative">
                    <Link href={PATHS.HOME} legacyBehavior={false}>
                        <FoundryLogo size="48px" withText />
                    </Link>
                    {isSignedIn ? (
                        <>
                            <Link href={PATHS.SETUP}>Setup</Link>
                            <Link href={PATHS.PANEL}>Panel</Link>
                        </>
                    ) : (
                        <>
                            <Link href={PATHS.SIGN_UP}>Sign Up</Link>
                            <Link href={PATHS.SIGN_IN}>Sign In</Link>
                        </>
                    )}
                    <ThemeSwitch />
                    <div className={styles.userButton}>
                        <UserButton appearance={{ elements: { avatarBox: { width: '2.5rem', height: '2.5rem' } } }} />
                    </div>
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
