import { Avatar, Box, Burger, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useAuth } from '@clerk/nextjs'
import useStyles from '@/components/user-button/style'
import React, { useCallback, useState } from 'react'
import { PATHS } from '@/constants'
import Dropdown from './components/dropdown'
import { useRouter } from 'next/router'
import useUser from '@/hooks/api/use-user'
import useViewportSize, { isMobileViewport } from '@/hooks/use-viewport-size'

const UserButton = () => {
    const { push } = useRouter()
    const { signOut } = useAuth()
    const [open, setIsOpen] = useState(false)
    const { data: user } = useUser()
    const { classes } = useStyles()
    const { type } = useViewportSize()
    const isMobile = isMobileViewport(type)

    const onSignOut = useCallback(async () => {
        await signOut()
        await push(PATHS.ROOT)
    }, [push, signOut])

    const ButtonContent = () => (
        <>
            <Avatar src={user?.imageUrl} radius="xl" size={!!user ? 'sm' : 'md'} />
            {!!user ? (
                <Box style={{ flex: 1 }} pos="relative">
                    <Text size="sm" weight={500}>
                        {user.name}
                    </Text>
                    <Text color="dimmed" size={11} maw={140}>
                        {user.email}
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
                <Dropdown isSignedIn={!!user} onSignOut={onSignOut} />
            </Menu>
        </div>
    )
}

export default UserButton
