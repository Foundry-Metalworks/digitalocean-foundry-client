import React from 'react'
import { Menu } from '@mantine/core'
import Link from '@/components/kit/link'
import { PATHS } from '@/constants'
import { IconDashboard, IconLogin, IconLogout, IconUser, IconUserExclamation } from '@tabler/icons-react'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { DropdownProps } from '../'

const DropdownDesktop: React.FC<DropdownProps> = ({ isSignedIn, onSignOut }) => {
    return (
        <Menu.Dropdown w="100%">
            {isSignedIn ? (
                <>
                    <Link href={PATHS.DASHBOARD}>
                        <Menu.Item icon={<IconDashboard size={14} />}>Dashboard</Menu.Item>
                    </Link>
                    <Link href={PATHS.ACCOUNT}>
                        <Menu.Item icon={<IconUser size={14} />}>Account</Menu.Item>
                    </Link>
                    <Menu.Item icon={<IconLogout size={14} />} onClick={() => onSignOut()}>
                        Sign Out
                    </Menu.Item>
                </>
            ) : (
                <>
                    <SignInButton>
                        <Menu.Item icon={<IconLogin size={14} />}>Sign In</Menu.Item>
                    </SignInButton>
                    <SignUpButton>
                        <Menu.Item icon={<IconUserExclamation size={14} />}>Sign Up</Menu.Item>
                    </SignUpButton>
                </>
            )}
        </Menu.Dropdown>
    )
}

export default DropdownDesktop
