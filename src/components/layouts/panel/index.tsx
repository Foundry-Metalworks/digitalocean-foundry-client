import React, { PropsWithChildren } from 'react'

import { Box } from '@mantine/core'

import MainLayout from '@/components/layouts/main'
import Loading from '@/components/shared/loading'
import ServerContext, { ServerProvider } from '@/context/server'
import UserContext, { UserProvider } from '@/context/user'

const PanelLayout: React.FC<PropsWithChildren<{ needsServer?: boolean }>> = ({ children, needsServer = false }) => {
    return (
        <MainLayout showLogo>
            <UserProvider>
                <UserContext.Consumer>
                    {({ isLoading }) => {
                        if (isLoading) return <Loading />
                        return (
                            <ServerProvider needsServer={needsServer}>
                                <ServerContext.Consumer>
                                    {({ isLoading }) => {
                                        if (isLoading) return <Loading />
                                        return (
                                            <Box maw="80%" w="40rem">
                                                {children}
                                            </Box>
                                        )
                                    }}
                                </ServerContext.Consumer>
                            </ServerProvider>
                        )
                    }}
                </UserContext.Consumer>
            </UserProvider>
        </MainLayout>
    )
}

export default PanelLayout
