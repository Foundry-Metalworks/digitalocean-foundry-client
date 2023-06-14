import React, { useCallback, useContext, useEffect, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, MantineColor, Space, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { NextPage } from 'next'

import { query } from '@/api/network'
import InviteModal from '@/components/invite-modal'
import Loading from '@/components/loading'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

type ServerStatusType = 'active' | 'off' | 'deleted' | 'pending'

const Panel: NextPage = () => {
    const [serverStatus, setServerStatus] = useState<ServerStatusType>('pending')
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false)

    const {
        data: { user },
        dispatch: { signOut },
    } = useContext(UserContext)
    const { getToken } = useAuth()
    const server = user?.server
    const isOn = serverStatus == 'active'

    // Status updating
    const fetchStatus = useCallback(async () => {
        const token = await getToken()
        const data = await query<{ status: ServerStatusType }>({ endpoint: '/instance/status', token })
        const { status } = data
        setServerStatus(status)
    }, [])

    useEffect(() => {
        fetchStatus()
        const interval = setInterval(() => {
            fetchStatus()
        }, 15000)
        return () => clearInterval(interval)
    }, [fetchStatus])

    const handleStart = async () => {
        setIsLoading(true)
        const token = await getToken()
        notifications.show({ message: 'Starting Server' })
        await query({ endpoint: '/instance/start', method: 'POST', token })
        setIsLoading(false)
        await fetchStatus()
    }

    const handleStop = async () => {
        setIsLoading(true)
        const token = await getToken()
        notifications.show({ message: 'Stopping Server' })
        await query({ endpoint: '/instance/stop', method: 'POST', token })
        setIsLoading(false)
        await fetchStatus()
    }

    const handleSave = async () => {
        setIsLoading(true)
        const token = await getToken()
        notifications.show({ message: 'Saving Server' })
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

    if (isLoading || serverStatus == 'pending') return <Loading />

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
            <br />
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
