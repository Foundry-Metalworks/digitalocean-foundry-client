import React, { useState } from 'react'
import { Box, Group, Navbar, NavLink, Stack, Text } from '@mantine/core'
import { IconDeviceGamepad, IconLogout, IconSocial } from '@tabler/icons-react'
import { NextPage } from 'next'
import IconBrandDigitalOcean from '@/components/icons/digital-ocean'
import { SignOutButton, useUser } from '@clerk/nextjs'
import DashboardContext from '@/context/dashboard'
import Invites from '@/components/pages/dashboard/section/invites'
import Games from '@/components/pages/dashboard/section/games'
import Digitalocean from '@/components/pages/dashboard/section/digitalocean'
import { useViewportSize } from '@mantine/hooks'
import { BREAKPOINTS } from '@/constants'

const DOIcon = () => <IconBrandDigitalOcean size={18} />

const mockdata = [
    { icon: IconDeviceGamepad, label: 'Games' },
    { icon: IconSocial, label: 'Invites' },
    { icon: DOIcon, label: 'DigitalOcean Integration' },
]

const Dashboard: NextPage = () => {
    const [active, setActive] = useState(0)
    const { user } = useUser()
    const { width } = useViewportSize()
    const isMobile = width < BREAKPOINTS.TABLET

    const links = mockdata.map((link, index) => {
        const { icon: Icon, label } = link
        return (
            <NavLink
                icon={<Icon />}
                key={`dashboard-link-${label}`}
                active={index === active}
                onClick={() => setActive(index)}
                label={label}
            />
        )
    })

    return (
        <Group w="100vw" px="md" py={0} pos="relative" spacing={0}>
            <Navbar height={750} w="25%" p="md">
                {!isMobile && (
                    <Navbar.Section>
                        <Text>
                            Welcome, <strong>{user?.username}</strong>
                        </Text>
                    </Navbar.Section>
                )}
                <Navbar.Section grow mt={50}>
                    <Stack justify="center" spacing={0}>
                        {links}
                    </Stack>
                </Navbar.Section>
                <Navbar.Section>
                    <Stack justify="center" spacing={0}>
                        <SignOutButton>
                            <NavLink icon={<IconLogout />} label="Sign Out" />
                        </SignOutButton>
                    </Stack>
                </Navbar.Section>
            </Navbar>
            <DashboardContext.Provider value={{ section: active }}>
                <Box w="75%" h={750} pos="relative">
                    <Games />
                    <Invites />
                    <Digitalocean />
                </Box>
            </DashboardContext.Provider>
        </Group>
    )
}

export default Dashboard
