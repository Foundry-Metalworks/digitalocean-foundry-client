import React, { PropsWithChildren } from 'react'

import { UserButton } from '@clerk/nextjs'
import { Container, Group, Header, Space } from '@mantine/core'

import Dropdown from '@/components/kit/dropdown'
import Link from '@/components/kit/link'
import FoundryLogo from '@/components/shared/foundry-logo'
import PanelDropdown from '@/components/shared/panel-dropdown'
import ThemeSwitch from '@/components/shared/theme-switch'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/use-user'

import styles from './styles.module.scss'

export interface MainLayoutProps extends PropsWithChildren {
    showLogo?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogo = true }: MainLayoutProps) => {
    const { data: user } = useUser()
    const isSignedIn = !!user
    const servers = user?.servers || []

    return (
        <div>
            <Header height="4rem" px="2rem" mb="xl" pos="sticky">
                <Group h="inherit" pos="relative" style={{ justifyContent: 'space-between' }}>
                    <Group>
                        <Link href={PATHS.ROOT} legacyBehavior={false}>
                            <FoundryLogo size="48px" withText />
                        </Link>
                        {isSignedIn && (
                            <Dropdown
                                label="Setup"
                                labelType="link"
                                links={[
                                    { label: 'DM', href: `${PATHS.SETUP}?type=dm` },
                                    { label: 'Player', href: `${PATHS.SETUP}?type=player` },
                                ]}
                            />
                        )}
                        {isSignedIn && !!servers.length && <PanelDropdown text="Panel" labelType="link" />}
                    </Group>
                    <Group>
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
                {showLogo && (
                    <>
                        <Space h="md" />
                        <FoundryLogo size="256px" center />
                        <Space h="xl" />
                    </>
                )}
                {children}
            </Container>
        </div>
    )
}

export default MainLayout
