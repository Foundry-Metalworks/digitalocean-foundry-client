import React, { useContext, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { Button, Space, Stack } from '@mantine/core'
import { NextPage } from 'next'

import PanelLayout from '@/components/layouts/panel'
import ServerContext from '@/context/server'
import SetupCreate from '@/pages/setup/create-setup'
import SetupJoin from '@/pages/setup/join-setup'
import SelectType from '@/pages/setup/select-type'

const UnwrappedSetup: NextPage = () => {
    const [setupType, setSetupType] = useState<'create' | 'join' | null>(null)
    const { signOut } = useAuth()
    const {
        dispatch: { create, joinByToken },
    } = useContext(ServerContext)

    const renderContent = () => {
        if (!setupType) return <SelectType onTypeSelected={setSetupType} />
        if (setupType == 'create') {
            return <SetupCreate onSubmit={create} />
        }
        return <SetupJoin onSubmit={joinByToken} />
    }

    return (
        <Stack>
            {renderContent()}
            <Space h="xs" />
            <Button component="a" color="red" onClick={() => signOut()}>
                Sign Out
            </Button>
        </Stack>
    )
}

const Setup: NextPage = () => {
    return (
        <PanelLayout>
            <UnwrappedSetup />
        </PanelLayout>
    )
}

export default Setup
