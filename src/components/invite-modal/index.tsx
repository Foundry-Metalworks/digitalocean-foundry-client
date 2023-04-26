import React, { useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core'

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
        setIsLoading(false)
        onClose()
    }

    const copyLink = async () => {
        setIsLoading(true)
        const userToken = await getToken()
        const { link } = await query({ endpoint: '/server/link', token: userToken })
        await navigator.clipboard.writeText(link)
        setIsLoading(false)
        onClose()
    }

    const copyToken = async () => {
        setIsLoading(true)
        const userToken = await getToken()
        const { token } = await query({ endpoint: '/server/token', token: userToken })
        await navigator.clipboard.writeText(token)
        setIsLoading(false)
        onClose()
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Invite Players"
            withCloseButton={!isLoading}
            closeOnEscape={!isLoading}
            closeOnClickOutside={!isLoading}
            centered
        >
            {isLoading ? (
                <Loading />
            ) : (
                <Stack className={styles.inviteModal}>
                    <Button component="a" onClick={copyLink}>
                        Copy Link
                    </Button>
                    <Button component="a" onClick={copyToken}>
                        Copy Token
                    </Button>
                    <Group>
                        <TextInput
                            label="E-Mail"
                            placeholder="john.doe@site.com"
                            onChange={(e) => setInviteEmail(e.target.value)}
                        />
                        <Button component="a" onClick={inviteUser}>
                            Invite User
                        </Button>
                    </Group>
                </Stack>
            )}
        </Modal>
    )
}

export default InviteModal
