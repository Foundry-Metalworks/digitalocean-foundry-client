import React, { useState } from 'react'

import { Button, Text, TextInput } from '@mantine/core'

import { useQuery } from '@/api/network'

type SetupCreateProps = {
    onSubmit: (name: string, doApiToken: string) => void
}

const SetupCreate: React.FC<SetupCreateProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('')
    const [doApiToken, setDoApiToken] = useState<string>('')

    const { data } = useQuery<{ exists: boolean }>({
        key: `is-taken-${name}`,
        endpoint: `/server/${name}/exists`,
        enabled: !!name,
        initialData: { exists: false },
    })
    const exists = !!data?.exists

    return (
        <>
            <TextInput label="Server Name" placeholder="foundry" onChange={(e) => setName(e.target.value)} />
            <Text display={exists ? 'inherit' : 'none'} color="red" size="xs">
                That name is taken
            </Text>
            <TextInput
                label="DigitalOcean Token"
                placeholder="dop_v1_sdfugsdf8dsgffug8e48afhu3i934uhf9hfw9hfofeh"
                onChange={(e) => setDoApiToken(e.target.value)}
            />
            <Button disabled={exists} component="a" onClick={() => onSubmit(name, doApiToken)}>
                Submit
            </Button>
        </>
    )
}

export default SetupCreate
