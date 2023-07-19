import React from 'react'
import { Group, Header, UnstyledButton } from '@mantine/core'
import Link from '@/components/kit/link'
import { PATHS } from '@/constants'
import FoundryLogo from '@/components/shared/foundry-logo'
import Dropdown from '@/components/kit/dropdown'
import PanelDropdown from '@/components/shared/panel-dropdown'
import ThemeSwitch from '@/components/shared/theme-switch'
import { HeaderProps } from '@/components/layouts/main/header/types'
import UserButton from '@/components/user-button'

const scrollTo = async (id: string) => {
    console.log('scrolling')
    const element = document.getElementById(id)
    if (element) {
        const scrollOffset = -3 * (window.innerWidth / 100) - 60
        const scrollPosition = element.offsetTop
        await window.scrollTo({ behavior: 'smooth', top: scrollPosition + scrollOffset })
    }
}

const DesktopHeader: React.FC<HeaderProps> = ({ isSignedIn, hasServer }) => {
    const SignedInLinks = () => (
        <>
            <Dropdown
                label="Setup"
                labelType="link"
                links={[
                    { label: 'DM', href: `${PATHS.SETUP}?type=dm` },
                    { label: 'Player', href: `${PATHS.SETUP}?type=player` },
                ]}
            />
            {hasServer && <PanelDropdown text="Panel" labelType="link" />}
        </>
    )

    const SignedOutLinks = () => (
        <>
            <UnstyledButton onClick={() => scrollTo('setup')}>Setup</UnstyledButton>
            <UnstyledButton onClick={() => scrollTo('faq')}>FAQ</UnstyledButton>
        </>
    )

    return (
        <Header height="4rem" px="2rem" mb="xl" pos="sticky">
            <Group h="inherit" pos="relative" position="apart">
                <Group h="inherit">
                    <Link href={PATHS.ROOT} legacyBehavior={false}>
                        <FoundryLogo size="48px" withText />
                    </Link>
                    {isSignedIn && <SignedInLinks />}
                    {!isSignedIn && <SignedOutLinks />}
                </Group>
                <Group h="inherit">
                    <ThemeSwitch />
                    <UserButton />
                </Group>
            </Group>
        </Header>
    )
}

export default DesktopHeader
