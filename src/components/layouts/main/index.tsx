import React, { PropsWithChildren } from 'react'

import { useAuth } from '@clerk/nextjs'
import { Container, Space } from '@mantine/core'
import FoundryLogo from '@/components/shared/foundry-logo'
import { useUser } from '@/hooks/api/use-user'

import styles from './styles.module.scss'
import MobileHeader from '@/components/layouts/main/header/mobile'
import DesktopHeader from '@/components/layouts/main/header/desktop'
import useViewportSize, { isMobileViewport } from '@/hooks/use-viewport-size'

export interface MainLayoutProps extends PropsWithChildren {
    showLogo?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogo = true }: MainLayoutProps) => {
    const { data: user } = useUser()
    const { isSignedIn } = useAuth()
    const hasServer = !!user?.servers.length
    const { type } = useViewportSize()
    const isMobile = isMobileViewport(type)

    return (
        <div>
            {isMobile ? (
                <MobileHeader isSignedIn={!!isSignedIn} hasServer={hasServer} />
            ) : (
                <DesktopHeader isSignedIn={!!isSignedIn} hasServer={hasServer} />
            )}
            <Container display="flex" className={styles.mainContent} maw="100%" w="60rem">
                {showLogo && (
                    <>
                        <Space h="md" />
                        <FoundryLogo size={isMobile ? '184px' : '256px'} center />
                        <Space h="xl" />
                    </>
                )}
                {children}
            </Container>
        </div>
    )
}

export default MainLayout
