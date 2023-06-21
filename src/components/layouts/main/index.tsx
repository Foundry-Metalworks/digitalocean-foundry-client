import React, { PropsWithChildren, useContext } from 'react'

import { useAuth, UserButton } from '@clerk/nextjs'
import { Container, Group, Header, Space, Stack } from '@mantine/core'

import FoundryLogo from '@/components/shared/foundry-logo'
import Link from '@/components/shared/link'
import Loading from '@/components/shared/loading'
import ThemeSwitch from '@/components/shared/theme-switch'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

export interface MainLayoutProps extends PropsWithChildren {
    showLogo?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogo = true }: MainLayoutProps) => {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded)
        return (
            <div style={{ margin: '50vh auto 0' }}>
                <Loading />
            </div>
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
            <Container display="flex" className={styles.mainContent} mw="100%" w="60rem">
                <FoundryLogo size="256px" hidden={!showLogo} center />
                <Space h="3rem" />
                {children}
            </Container>
        </div>
    )
}

export default MainLayout
