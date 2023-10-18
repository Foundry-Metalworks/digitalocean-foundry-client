import React, { useCallback, useMemo } from 'react'
import { Box, Group, Navbar, NavLink, Stack, Text } from '@mantine/core'
import { IconDeviceGamepad, IconLogout, IconSocial, IconUser, TablerIconsProps } from '@tabler/icons-react'
import { NextPage } from 'next'
import IconBrandDigitalOcean from '@/components/icons/digital-ocean'
import { SignOutButton, UserProfile, useUser } from '@clerk/nextjs'
import DashboardContext, { DashboardSectionEnum } from '@/context/dashboard'
import Invites from '@/components/pages/dashboard/section/invites'
import Games from '@/components/pages/dashboard/section/games'
import Digitalocean from '@/components/pages/dashboard/section/digitalocean'
import { useViewportSize } from '@mantine/hooks'
import { BREAKPOINTS, PATHS } from '@/constants'
import { useRouter } from 'next/router'
import DashboardSection from '@/components/pages/dashboard/section'

const DOIcon = () => <IconBrandDigitalOcean size={18} />

type DashboardData = { icon: React.FC<TablerIconsProps>; label: string; id: DashboardSectionEnum }

const dashboardData: DashboardData[] = [
    { icon: IconDeviceGamepad, label: 'Games', id: DashboardSectionEnum.GAMES },
    { icon: IconSocial, label: 'Invites', id: DashboardSectionEnum.INVITES },
    { icon: DOIcon, label: 'DigitalOcean Integration', id: DashboardSectionEnum.DIGITALOCEAN },
]

const Dashboard: NextPage = () => {
    const { push, query } = useRouter()
    const tab: DashboardSectionEnum = useMemo(
        () => (query.tab || DashboardSectionEnum.GAMES) as DashboardSectionEnum,
        [query.tab],
    )
    const { user } = useUser()
    const { width } = useViewportSize()
    const isMobile = width < BREAKPOINTS.TABLET

    const pushTab = useCallback(
        async (id: DashboardSectionEnum) => {
            await push({ query: { ...query, tab: id } })
        },
        [push, query],
    )

    const links = dashboardData.map((link) => {
        const { icon: Icon, label, id } = link
        return (
            <NavLink
                icon={<Icon />}
                key={`dashboard-link-${label}`}
                active={id === tab}
                onClick={() => pushTab(id)}
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
                        <NavLink
                            icon={<IconUser />}
                            label="Account"
                            onClick={() => pushTab(DashboardSectionEnum.ACCOUNT)}
                        />
                        <SignOutButton signOutCallback={() => push(PATHS.ROOT)}>
                            <NavLink icon={<IconLogout />} label="Sign Out" />
                        </SignOutButton>
                    </Stack>
                </Navbar.Section>
            </Navbar>
            <DashboardContext.Provider value={{ section: tab }}>
                <Box w="75%" h={750} pos="relative">
                    <Games />
                    <Invites />
                    <Digitalocean />
                    <DashboardSection section={DashboardSectionEnum.ACCOUNT} title="Account">
                        <UserProfile
                            appearance={{
                                elements: {
                                    rootBox: { margin: '0 auto', height: '90%' },
                                    card: { height: '100%' },
                                    navbar: { display: 'none' },
                                    header: { display: 'none' },
                                },
                            }}
                        />
                    </DashboardSection>
                </Box>
            </DashboardContext.Provider>
        </Group>
    )
}

export default Dashboard
