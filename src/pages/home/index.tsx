import React, { useContext } from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, Stack, Title } from '@mantine/core'
import { NextPage } from 'next'

import MainLayout from '@/components/layouts/main'
import Link from '@/components/shared/link'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

const Home: NextPage = () => {
    const { signOut } = useAuth()
    const { data: user } = useContext(UserContext)

    return (
        <Stack className={styles.homeContent}>
            {!!user ? (
                <>
                    <Title className={styles.userTitle} order={3}>
                        Welcome, {user.name}
                    </Title>
                    <Link href="/panel">
                        <Button component="a">Go to Panel</Button>
                    </Link>
                    <Button component="a" color="red" onClick={signOut}>
                        Sign Out
                    </Button>
                </>
            ) : (
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
        </Stack>
    )
}

export default Home
