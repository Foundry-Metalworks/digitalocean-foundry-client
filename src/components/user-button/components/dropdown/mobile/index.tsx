import React from 'react'
import { DropdownProps } from '../'
import { Group, Menu, Text } from '@mantine/core'
import ThemeSwitch from '@/components/shared/theme-switch'
import Link from '@/components/kit/link'
import { PATHS } from '@/constants'
import { IconLogin, IconLogout, IconPaint, IconUser, IconUserExclamation } from '@tabler/icons-react'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

const DropdownMobile: React.FC<DropdownProps> = ({ isSignedIn, onSignOut }) => {
    return (
        <Menu.Dropdown w="100%" pos="fixed">
            {isSignedIn ? (
                <>
                    <Menu.Item h={64} closeMenuOnClick={false} icon={<IconPaint size={14} />}>
                        <Group>
                            <Text size="md">Theme</Text> <ThemeSwitch />
                        </Group>
                    </Menu.Item>
                    <Link href={PATHS.ACCOUNT}>
                        <Menu.Item h={64} icon={<IconUser size={14} />}>
                            <Text size="md">Account</Text>
                        </Menu.Item>
                    </Link>
                    <Menu.Item h={64} icon={<IconLogout size={14} />} onClick={() => onSignOut()}>
                        <Text size="md">Sign Out</Text>
                    </Menu.Item>
                </>
            ) : (
                <>
                    <SignInButton>
                        <Menu.Item h={64} icon={<IconLogin size={14} />}>
                            Sign In
                        </Menu.Item>
                    </SignInButton>
                    <SignUpButton>
                        <Menu.Item h={64} icon={<IconUserExclamation size={14} />}>
                            Sign Up
                        </Menu.Item>
                    </SignUpButton>
                </>
            )}
        </Menu.Dropdown>
    )
}

export default DropdownMobile
