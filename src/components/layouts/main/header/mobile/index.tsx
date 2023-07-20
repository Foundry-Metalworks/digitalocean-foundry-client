import React from 'react'
import { Group, Header, Text } from '@mantine/core'
import Link from '@/components/kit/link'
import { PATHS } from '@/constants'
import { HeaderProps } from '@/components/layouts/main/header/types'
import FoundryLogo from '@/components/shared/foundry-logo'
import UserButton from '@/components/user-button'

const MobileHeader: React.FC<HeaderProps> = ({ isSignedIn, hasServer }) => {
    console.log('rendering mobile header')

    return (
        <Header height="4rem" px="1rem" mb="xl" pos="sticky">
            <Group h="inherit" pos="relative" position="apart">
                <Link href={PATHS.ROOT}>
                    <FoundryLogo size="42px" withText center={false} />
                </Link>
                <Group>
                    {isSignedIn ? (
                        hasServer ? (
                            <Link href={PATHS.DASHBOARD}>
                                <Text>Dashboard</Text>
                            </Link>
                        ) : (
                            <Link href={PATHS.SETUP}>
                                <Text>Setup</Text>
                            </Link>
                        )
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
