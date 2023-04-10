import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Button, MantineColor, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'

import { bffService } from '@/api/network'
import Loading from '@/components/loading'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

type ServerStatusType = 'active' | 'off' | 'deleted'

const Panel: NextPage = () => {
    const [serverStatus, setServerStatus] = useState<ServerStatusType>('off')
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const {
        data: { user },
        dispatch: { signOut },
    } = useContext(UserContext)
    const server = user?.server
    const isOn = serverStatus == 'active'

    const fetchStatus = useCallback(() => {
        setIsLoading(true)
        bffService.get('/instance/status').then((response) => {
            const { status } = response.data
            setServerStatus(status)
            setIsLoading(false)
        })
    }, [])

    const fetchToken = useCallback(() => {
        bffService.get('/server/token').then((response) => {
            const { token } = response.data
            setToken(token)
        })
    }, [])

    // fetch status on interval
    useEffect(() => {
        fetchStatus()
        const interval = setInterval(fetchStatus, 60000)
        return () => clearInterval(interval)
    }, [fetchStatus])

    useEffect(() => {
        fetchToken()
        const interval = setInterval(fetchToken, 14000)
        return () => clearInterval(interval)
    }, [fetchToken])

    const handleStart = async () => {
        setIsLoading(true)
        await bffService.post('/instance/start')
        fetchStatus()
    }

    const handleStop = async () => {
        setIsLoading(true)
        await bffService.post('/instance/stop')
        fetchStatus()
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
        window.open(ip, '_blank')
        setIsLoading(false)
    }

    if (isLoading) return <Loading />

    return (
        <Stack className={styles.panelContent}>
            <Title className={styles.serverTitle} order={2} h="md">
                SERVER:
            </Title>
            <Text
                size={'xl'}
                display="inline"
                weight="normal"
                color={(isOn ? 'green' : 'red') as MantineColor}
            >{`${server}`}</Text>
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
                    </>
                )}
                <Title className={styles.tokenTitle} order={3} h="md">
                    TOKEN:
                </Title>
                <Text className={styles.tokenBody} color="blue">
                    {token}
                </Text>
                <Button component="a" color="red" onClick={signOut}>
                    Logout
                </Button>
            </Stack>
        </Stack>
    )
}

export default Panel
