import React, { useCallback, useState } from 'react'

import { Button, Text, TextInput } from '@mantine/core'

import { bffService, useQuery } from '@/api/network'

type SetupCreateProps = {
    onSubmit: (name: string, doApiToken: string) => void
}

const fetchIsTaken = async (name: string) => {
    const { data: exists } = await bffService.get(`/server/${name}/exists`)
    return exists
}

const SetupCreate: React.FC<SetupCreateProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('')
    const [doApiToken, setDoApiToken] = useState<string>('')

    const isTakenFunc = useCallback(() => fetchIsTaken(name), [name])
    const { data: isNameTaken } = useQuery<boolean>(isTakenFunc, {
        key: `is-taken-${name}`,
        enabled: !!name,
        initialData: false,
    })

    return (
        <>
            <TextInput label="Server Name" placeholder="foundry" onChange={(e) => setName(e.target.value)} />
            <Text display={isNameTaken ? 'inherit' : 'none'} color="red" size="xs">
                That name is taken
            </Text>
            <TextInput
                label="DigitalOcean Token"
                placeholder="dop_v1_sdfugsdf8dsgffug8e48afhu3i934uhf9hfw9hfofeh"
                onChange={(e) => setDoApiToken(e.target.value)}
            />
            <Button disabled={isNameTaken} component="a" onClick={() => onSubmit(name, doApiToken)}>
                Submit
            </Button>
        </>
    )
}

export default SetupCreate
