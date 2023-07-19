import { Avatar, Box, Burger, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useAuth, useUser } from '@clerk/nextjs'
import useStyles from '@/components/user-button/style'
import React, { useState } from 'react'
import { BREAKPOINTS } from '@/constants'
import { useViewportSize } from '@mantine/hooks'
import Dropdown from './components/dropdown'

const UserButton = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    const { signOut } = useAuth()
    const [open, setIsOpen] = useState(false)
    const isSignedInUser = isLoaded && isSignedIn
    const { classes } = useStyles()
    const { width } = useViewportSize()
    const isMobile = width < BREAKPOINTS.TABLET

    const ButtonContent = () => (
        <>
            <Avatar src={user?.profileImageUrl} radius="xl" size={isSignedInUser ? 'sm' : 'md'} />
            {isSignedInUser ? (
                <Box style={{ flex: 1 }} pos="relative">
                    <Text size="sm" weight={500}>
                        {user?.username}
                    </Text>
                    <Text color="dimmed" size={11} maw={140}>
                        {user?.primaryEmailAddress?.emailAddress}
                    </Text>
                </Box>
            ) : (
                <Text size="md" weight={500}>
                    Sign In / Sign Up
                </Text>
            )}
        </>
    )

    return (
        <div
            className={classes.userButtonContainer}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Menu
                onChange={setIsOpen}
                opened={open}
                position={isMobile ? 'bottom' : 'bottom-start'}
                offset={isMobile ? 14 : 2}
                width={isMobile ? '100vw' : '100%'}
            >
                <Menu.Target>
                    {isMobile ? (
                        <Burger opened={open} />
                    ) : (
                        <UnstyledButton className={classes.userButton}>
                            <Group w="100%" position="apart" noWrap>
                                <Group spacing="0.5rem" noWrap>
                                    <ButtonContent />
                                </Group>
                                <IconChevronDown size="1rem" stroke={1.5} />
                            </Group>
                        </UnstyledButton>
                    )}
                </Menu.Target>
                <Dropdown isSignedIn={!!isSignedInUser} onSignOut={signOut} />
            </Menu>
        </div>
    )
}

export default UserButton
