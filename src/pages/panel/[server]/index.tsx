import React from 'react'

import { Box, Button, MantineColor, Space, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'

import Loading from '@/components/kit/loading'
import InviteModal from '@/components/pages/panel/invite-modal'
import { CACHE_TIME, PATHS } from '@/constants'
import { useInstance } from '@/hooks/use-instance'
import useServer, { ServerType } from '@/hooks/use-server'

import styles from './styles.module.scss'
import { queryClient, withAuthAndUser } from '@/util/server'
import { query } from '@/api/network'
import { getAuth } from '@clerk/nextjs/server'
import { ServerStatusType } from '@/types'

const Panel: React.FC = () => {
    const { query } = useRouter()
    const serverId = query.server as string
    const { data } = useServer(serverId)
    const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false)
    const permissions = data?.permissions
    const server = data?.name || ''

    const {
        isFetching,
        instanceStatus,
        actions: { startServer, stopServer, saveServer, goToServer },
    } = useInstance(server)
    const { push } = useRouter()

    if (isFetching || !instanceStatus) return <Loading />

    return (
        <Box maw="80%" w="40rem" pos="relative">
            <Stack className={styles.panelContent} ta="center">
                <InviteModal serverId={serverId} opened={isModalOpen} onClose={closeModal} />
                <Title className={styles.serverTitle} order={2} h="md">
                    SERVER:
                </Title>
                <Text
                    size={'xl'}
                    display="inline"
                    weight="normal"
                    color={(instanceStatus == 'active' ? 'green' : 'red') as MantineColor}
                >{`${server}`}</Text>
                <br />
                <Stack className={styles.panelButtons}>
                    {instanceStatus == 'active' ? (
                        <>
                            <Button component="a" color="green" onClick={goToServer}>
                                Go To Server
                            </Button>
                            {!!permissions?.canstop && (
                                <Button component="a" color="red" onClick={stopServer}>
                                    Stop Server
                                </Button>
                            )}
                            {!!permissions?.cansave && (
                                <Button component="a" onClick={saveServer}>
                                    Save Server
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            {!!permissions?.canstart && (
                                <Button component="a" color="green" onClick={startServer}>
                                    Start Server
                                </Button>
                            )}
                        </>
                    )}
                    <Space h="sm" />
                    {!!permissions?.caninvite && (
                        <Button component="a" onClick={openModal}>
                            Invite
                        </Button>
                    )}
                    <Button component="a" color="red" onClick={() => push(PATHS.ROOT)}>
                        Return Home
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export const getServerSideProps = withAuthAndUser(async (ctx) => {
    const { getToken } = getAuth(ctx.req)
    const server = ctx.query.server as string
    const token = await getToken()
    await queryClient.prefetchQuery(
        ['getServer', server],
        () => query<ServerType>({ endpoint: `/servers/${server}`, token }),
        { staleTime: CACHE_TIME },
    )
    await queryClient.prefetchQuery(
        ['getInstance', server],
        () => query<{ status: ServerStatusType }>({ endpoint: `/instance/${server}/status`, token }),
        { staleTime: 5000 },
    )
})

export default Panel
