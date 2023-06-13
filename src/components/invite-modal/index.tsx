import React, { useMemo, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { query } from '@/api/network'
import Loading from '@/components/loading'

import styles from './styles.module.scss'

interface Props {
    opened: boolean
    onClose: () => void
}

const InviteModal: React.FC<Props> = ({ opened, onClose }) => {
    const [inviteEmail, setInviteEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { getToken } = useAuth()

    const inviteUser = async () => {
        setIsLoading(true)
        const token = await getToken()
        await query({
            endpoint: '/server/invite',
            method: 'POST',
            body: {
                email: inviteEmail,
            },
            token,
        })
        onClose()
        setIsLoading(false)
        notifications.show({ message: 'Invited User' })
    }

    const copyLink = async () => {
        setIsLoading(true)
        const userToken = await getToken()
        query<{ link: string }>({ endpoint: '/server/link', token: userToken })
            .then(async ({ link }) => {
                await navigator.clipboard.writeText(link)
                notifications.show({ message: 'Copied One-Time Link to Clipboard' })
            })
            .catch((err) => {
                notifications.show({ message: err.message })
            })
            .finally(() => {
                onClose()
                setIsLoading(false)
            })
    }

    const copyToken = async () => {
        setIsLoading(true)
        const userToken = await getToken()
        const { token } = await query<{ token: string }>({ endpoint: '/server/token', token: userToken })
        await navigator.clipboard.writeText(token)
        onClose()
        setIsLoading(false)
        notifications.show({ message: 'Copied Token to Clipboard' })
    }

    const isValidEmail = useMemo(() => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(inviteEmail)
    }, [inviteEmail])

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Invite Players"
            withCloseButton={!isLoading}
            closeOnEscape={!isLoading}
            closeOnClickOutside={!isLoading}
            padding="lg"
            centered
        >
            <div className={styles.inviteModal}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Stack>
                        <Button component="a" onClick={copyLink}>
                            Copy Link
                        </Button>
                        <Button component="a" onClick={copyToken}>
                            Copy Token
                        </Button>
                        <Group align="end" position="apart" style={{ marginTop: '1rem' }}>
                            <TextInput
                                label="E-Mail"
                                placeholder="john.doe@site.com"
                                error={!!inviteEmail && !isValidEmail}
                                className={styles.emailInput}
                                onChange={(e) => setInviteEmail(e.target.value)}
                            />
                            <Button
                                component="a"
                                onClick={inviteUser}
                                className={styles.emailSubmit}
                                disabled={!isValidEmail}
                            >
                                Send Invite
                            </Button>
                        </Group>
                    </Stack>
                )}
            </div>
        </Modal>
    )
}

export default InviteModal
