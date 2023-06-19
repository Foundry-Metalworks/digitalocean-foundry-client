import React, { PropsWithChildren } from 'react'

import { UserButton } from '@clerk/nextjs'
import { Stack } from '@mantine/core'

import styles from './styles.module.scss'

export interface MainLayoutProps extends PropsWithChildren<MainLayoutProps> {
    showLogo?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogo = true }: MainLayoutProps) => {
    return (
        <div className={styles.root}>
            <div className={styles.userButton}>
                <UserButton appearance={{ elements: { avatarBox: { width: '3rem', height: '3rem' } } }} />
            </div>
            <Stack className={styles.content}>
                <img
                    className={styles.logo}
                    src="/logo512.png"
                    alt="Foundry Logo"
                    width="512"
                    style={{ display: showLogo ? 'inherit' : 'none' }}
                />
                <div className={styles.mainContent}>{children}</div>
            </Stack>
        </div>
    )
}

export default MainLayout
