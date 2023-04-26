import React, { useCallback, useContext, useEffect, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, MantineColor, Space, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NextPage } from 'next'

import { query } from '@/api/network'
import InviteModal from '@/components/invite-modal'
import Loading from '@/components/loading'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

type ServerStatusType = 'active' | 'off' | 'deleted'

const Panel: NextPage = () => {
    const [serverStatus, setServerStatus] = useState<ServerStatusType>('off')
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false)

    const {
        data: { user },
        dispatch: { signOut },
    } = useContext(UserContext)
    const { getToken } = useAuth()
    const server = user?.server
    const isOn = serverStatus == 'active'

    const fetchStatus = useCallback(() => {
        setIsLoading(true)
        getToken().then((token) =>
            query<{ status: ServerStatusType }>({ endpoint: '/instance/status', token }).then((data) => {
                const { status } = data
                setServerStatus(status)
                setIsLoading(false)
            }),
        )
    }, [])

    // fetch status on interval
    useEffect(() => {
        fetchStatus()
        const interval = setInterval(fetchStatus, 60000)
        return () => clearInterval(interval)
    }, [fetchStatus])

    const handleStart = async () => {
        setIsLoading(true)
        const token = await getToken()
        await query({ endpoint: '/instance/start', method: 'POST', token })
        fetchStatus()
    }

    const handleStop = async () => {
        setIsLoading(true)
        const token = await getToken()
        await query({ endpoint: '/instance/stop', method: 'POST', token })
        fetchStatus()
    }

    const handleSave = async () => {
        setIsLoading(true)
        const token = await getToken()
        await query({ endpoint: '/instance/save', method: 'POST', token })
        setIsLoading(false)
    }

    const handleGoTo = async () => {
        setIsLoading(true)
        const token = await getToken()
        const result = await query<{ ip: string }>({ endpoint: '/instance/ip', token })
        const { ip } = result
        window.open(ip, '_blank')
        setIsLoading(false)
    }

    if (isLoading) return <Loading />

    return (
        <Stack className={styles.panelContent}>
            <InviteModal opened={isModalOpen} onClose={closeModal} />
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
                <Space h="sm" />
                <Button component="a" onClick={openModal}>
                    Invite
                </Button>
                <Button component="a" color="red" onClick={signOut}>
                    Logout
                </Button>
            </Stack>
        </Stack>
    )
}

export default Panel
