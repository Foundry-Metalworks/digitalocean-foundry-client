import React from 'react'
import { Group, Header, Text } from '@mantine/core'
import Link from '@/components/kit/link'
import { BREAKPOINTS, PATHS } from '@/constants'
import { HeaderProps } from '@/components/layouts/main/header/types'
import { useViewportSize } from '@mantine/hooks'
import FoundryLogo from '@/components/shared/foundry-logo'
import UserButton from '@/components/user-button'

const MobileHeader: React.FC<HeaderProps> = ({ isSignedIn, hasServer }) => {
    const { width } = useViewportSize()
    const isSmall = width <= BREAKPOINTS.MOBILE_LG

    return (
        <Header height="4rem" px="1rem" mb="xl" pos="sticky">
            <Group h="inherit" pos="relative" position="apart">
                <Link href={PATHS.ROOT}>
                    <FoundryLogo size="42px" withText={!isSmall} center={false} />
                </Link>
                <Group>
                    {isSignedIn ? (
                        <>
                            <Link href={PATHS.SETUP}>
                                <Text>Setup</Text>
                            </Link>
                            <Link href={PATHS.DASHBOARD}>
                                <Text>Dashboard</Text>
                            </Link>
                        </>
                    ) : (
                        <Link href={PATHS.SIGN_IN}>Sign In</Link>
                    )}
                    <UserButton />
                </Group>
            </Group>
        </Header>
    )
}

export default MobileHeader
