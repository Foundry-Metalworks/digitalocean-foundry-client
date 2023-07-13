import React, { PropsWithChildren, useContext } from 'react'
import DashboardContext, { DashboardSectionEnum } from '@/context/dashboard'
import { Box, Stack, Title } from '@mantine/core'

type DashboardSectionProps = PropsWithChildren<{
    section: DashboardSectionEnum
    title: string
}>

const DashboardSection: React.FC<DashboardSectionProps> = ({ section, title, children }) => {
    const { section: contextSection } = useContext(DashboardContext)

    if (contextSection != section) return null

    return (
        <Stack p="lg" w="100%" h="100%">
            <Title order={2} ta="center">
                {title}
            </Title>
            <br />
            <Box p={0}>{children}</Box>
        </Stack>
    )
}

export default DashboardSection
