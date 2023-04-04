import React, { useContext } from 'react'

import { useClerk, useUser } from '@clerk/nextjs'
import { Button, Stack, Title } from '@mantine/core'
import { NextPage } from 'next'

import Link from '@/components/link'
import Loading from '@/components/loading'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

const Home: NextPage = () => {
    const {
        data: { error, isLoading, isAuthenticated },
    } = useContext(UserContext)
    const { signOut } = useClerk()
    const { user } = useUser()

    if (isLoading) return <Loading />
    if (error) return <div>{error.message}</div>

    console.log('rerendered home')
    return (
        <Stack className={styles.homeContent}>
            {!!user?.username && (
                <Title className={styles.userTitle} order={3}>
                    Welcome, {user.username}
                </Title>
            )}
            {!isAuthenticated && (
                <Link href={PATHS.SIGN_IN}>
                    <Button component="a">Login</Button>
                </Link>
            )}
            {isAuthenticated && (
                <>
                    <Link href="/panel">
                        <Button component="a">Go to Panel</Button>
                    </Link>
                    <Button component="a" color="red" onClick={signOut}>
                        Logout
                    </Button>
                </>
            )}
        </Stack>
    )
}

export default Home
