import React from 'react'
import { Group, Header } from '@mantine/core'
import Link from '@/components/kit/link'
import { PATHS } from '@/constants'
import FoundryLogo from '@/components/shared/foundry-logo'
import Dropdown from '@/components/kit/dropdown'
import PanelDropdown from '@/components/shared/panel-dropdown'
import ThemeSwitch from '@/components/shared/theme-switch'
import { UserButton } from '@clerk/nextjs'
import { HeaderProps } from '@/components/layouts/main/header/types'

const DesktopHeader: React.FC<HeaderProps> = ({ isSignedIn, hasServer }) => {
    return (
        <Header height="4rem" px="2rem" mb="xl" pos="sticky">
            <Group h="inherit" pos="relative" position="apart">
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
                    {isSignedIn && hasServer && <PanelDropdown text="Panel" labelType="link" />}
                </Group>
                <Group>
                    {!isSignedIn && <Link href={PATHS.SIGN_IN}>Sign In</Link>}
                    <ThemeSwitch />
                    {isSignedIn && (
                        <UserButton appearance={{ elements: { avatarBox: { width: '2.5rem', height: '2.5rem' } } }} />
                    )}
                </Group>
            </Group>
        </Header>
    )
}

export default DesktopHeader
