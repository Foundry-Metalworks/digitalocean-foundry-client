import React, { useContext, useEffect, useState } from 'react'

import { useClerk } from '@clerk/nextjs'
import { Button, MantineColor, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { bffService } from '@/api/network'
import Loading from '@/components/loading'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

type ServerStatusType = 'active' | 'off' | 'on'

const Panel: NextPage = () => {
    const { push } = useRouter()
    const { signOut } = useClerk()
    const [serverStatus, setServerStatus] = useState<ServerStatusType>('off')
    const [isLoading, setIsLoading] = useState(false)
    const {
        data: {
            user: { server },
        },
    } = useContext(UserContext)
    const isOn = serverStatus == 'active'

    useEffect(() => {
        setIsLoading(true)
        bffService.get('/instance/status').then((response) => {
            const { status } = response.data
            setServerStatus(status)
            setIsLoading(false)
        })
    }, [])

    const handleStart = async () => {
        setIsLoading(true)
        await bffService.post('/instance/start')
        setIsLoading(false)
    }

    const handleStop = async () => {
        setIsLoading(true)
        await bffService.post('/instance/stop')
        setIsLoading(false)
    }

    const handleSave = async () => {
        setIsLoading(true)
        await bffService.post('/instance/save')
        setIsLoading(false)
    }

    const handleGoTo = async () => {
        setIsLoading(true)
        const result = await bffService.get('/instance/ip')
        const { ip } = result.data
        window.location.assign(ip)
    }

    const handleCancel = async () => {
        await signOut()
        await push(PATHS.HOME)
    }

    if (isLoading) return <Loading />

    return (
        <Stack className={styles.panelContent}>
            <Title className={styles.serverTitle} order={2}>
                Server:{' '}
                <Text
                    size={'xl'}
                    display="inline"
                    weight="normal"
                    color={(isOn ? 'green' : 'red') as MantineColor}
                >{`${server}`}</Text>
            </Title>
            <Stack className={styles.panelButtons}>
                {isOn ? (
                    <>
                        <Button component="a" color="green" onClick={handleGoTo}>
                            Go To Server
                        </Button>
                        <Button component="a" color="red" onClick={handleStop}>
                            Stop Server
                        </Button>
                        <Button component="a" onClick={handleSave}>
                            Save Server
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component="a" color="green" onClick={handleStart}>
                            Start Server
                        </Button>
                        <Button component="a" color="red" onClick={handleCancel}>
                            Logout
                        </Button>
                    </>
                )}
            </Stack>
        </Stack>
    )
}

export default Panel
