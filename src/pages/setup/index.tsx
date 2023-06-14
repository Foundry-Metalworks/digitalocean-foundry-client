import React, { useContext, useState } from 'react'

import { Button, Space, Stack } from '@mantine/core'
import { NextPage } from 'next'

import RedirectTo from '@/components/redirect'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'
import SetupCreate from '@/pages/setup/create-setup'
import SetupJoin from '@/pages/setup/join-setup'
import SelectType from '@/pages/setup/select-type'

import styles from './styles.module.scss'

const Setup: NextPage = () => {
    const {
        data: { isSetup },
        dispatch: { createServer, joinServer, signOut },
    } = useContext(UserContext)
    const [setupType, setSetupType] = useState<'create' | 'join' | null>(null)

    if (isSetup) {
        return <RedirectTo path={PATHS.HOME} replace />
    }

    const renderContent = () => {
        if (!setupType) return <SelectType onTypeSelected={setSetupType} />
        if (setupType == 'create') {
            return <SetupCreate onSubmit={createServer} />
        }
        return <SetupJoin onSubmit={joinServer} />
    }

    return (
        <div className={styles.setupContent}>
            <Stack>
                {renderContent()}
                <Space h="xs" />
                <Button component="a" color="red" onClick={signOut}>
                    Sign Out
                </Button>
            </Stack>
        </div>
    )
}

export default Setup
