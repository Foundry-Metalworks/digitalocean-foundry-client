import React, { useContext } from 'react'

import { Button, Stack, Title } from '@mantine/core'
import { NextPage } from 'next'

import Link from '@/components/link'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

const Home: NextPage = () => {
    const {
        data: { user, isAuthenticated },
        dispatch: { signOut },
    } = useContext(UserContext)

    console.log('rerendered home')
    return (
        <Stack className={styles.homeContent}>
            {!!user?.name && (
                <Title className={styles.userTitle} order={3}>
                    Welcome, {user.name}
                </Title>
            )}
            {!isAuthenticated && (
                <>
                    <Link href={PATHS.SIGN_UP}>
                        <Button component="a" color="green">
                            Sign Up
                        </Button>
                    </Link>
                    <Link href={PATHS.SIGN_IN}>
                        <Button component="a">Sign In</Button>
                    </Link>
                </>
            )}
            {isAuthenticated && (
                <>
                    <Link href="/panel">
                        <Button component="a">Go to Panel</Button>
                    </Link>
                    <Button component="a" color="red" onClick={signOut}>
                        Sign Out
                    </Button>
                </>
            )}
        </Stack>
    )
}

export default Home
