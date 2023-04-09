import React, { useCallback, useContext, useState } from 'react'

import { useClerk } from '@clerk/nextjs'
import { Button, Stack, Text, TextInput } from '@mantine/core'
import { NextPage } from 'next'

import { bffService, useQuery } from '@/api/network'
import RedirectTo from '@/components/redirect'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

import styles from './styles.module.scss'

const fetchIsTaken = async (name: string) => {
    const {
        data: { isTaken },
    } = await bffService.get(`/server/${name}/exists`)
    return isTaken
}

const Setup: NextPage = () => {
    const { signOut } = useClerk()
    const {
        data: { user, isSetup },
        dispatch: { setupUser },
    } = useContext(UserContext)
    const server = user?.server
    const [name, setName] = useState<string>(server || '')
    const [doToken, setDoToken] = useState<string>('')
    const isTakenFunc = useCallback(() => fetchIsTaken(name), [name])
    const { data: isNameTaken } = useQuery<boolean>(isTakenFunc, {
        key: `is-taken-${name}`,
        enabled: !!name && !isSetup,
        initialData: false,
    })

    if (isSetup) return <RedirectTo path={PATHS.HOME} replace />

    const handleSubmit = async () => {
        await setupUser(name, doToken)
    }

    const handleCancel = async () => {
        await signOut()
    }

    return (
        <div className={styles.setupContent}>
            <Stack>
                <TextInput label="Server Name" placeholder="foundry" onChange={(e) => setName(e.target.value)} />
                <Text display={isNameTaken ? 'inherit' : 'none'} color="red" size="xs">
                    That name is taken
                </Text>
                <TextInput
                    label="DigitalOcean Token"
                    placeholder="dop_v1_sdfugsdf8dsgffug8e48afhu3i934uhf9hfw9hfofeh"
                    onChange={(e) => setDoToken(e.target.value)}
                />
                <Button disabled={isNameTaken} component="a" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button color="red" component="a" onClick={handleCancel}>
                    Cancel & Sign Out
                </Button>
            </Stack>
        </div>
    )
}

export default Setup
