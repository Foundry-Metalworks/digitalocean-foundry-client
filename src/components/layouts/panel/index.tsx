import React, { PropsWithChildren } from 'react'

import { Box } from '@mantine/core'

import MainLayout from '@/components/layouts/main'
import Loading from '@/components/shared/loading'
import RedirectTo from '@/components/shared/redirect'
import { PATHS } from '@/constants'
import ServerContext, { ServerProvider } from '@/context/server'
import UserContext, { UserProvider } from '@/context/user'

const PanelLayout: React.FC<PropsWithChildren<{ server?: string }>> = ({ children, server }) => {
    return (
        <MainLayout showLogo>
            <UserProvider>
                <UserContext.Consumer>
                    {({ isLoading }) => {
                        if (isLoading) return <Loading />
                        return (
                            <ServerProvider server={server}>
                                <ServerContext.Consumer>
                                    {({ isLoading, data }) => {
                                        if (isLoading) return <Loading />
                                        console.log('server: ' + !!server)
                                        if (!!server && !data?.name) return <RedirectTo path={PATHS.ROOT} />
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
