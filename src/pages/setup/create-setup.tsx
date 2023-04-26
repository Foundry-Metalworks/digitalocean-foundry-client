import React, { useState } from 'react'

import { Anchor, Button, NavLink, Text, TextInput } from '@mantine/core'

import { useQuery } from '@/api/network'
import Link from '@/components/link'

type SetupCreateProps = {
    onSubmit: (name: string, doApiToken: string) => void
}

const SetupCreate: React.FC<SetupCreateProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('')
    const [doApiToken, setDoApiToken] = useState<string>('')

    const { data: exists } = useQuery<boolean>({
        key: `is-taken-${name}`,
        endpoint: `/server/${name}/exists`,
        enabled: !!name,
        initialData: false,
    })

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
            <Anchor
                color="gray"
                size="xs"
                href="https://cloud.digitalocean.com/account/api/tokens"
                target="_blank"
                style={{ marginTop: '-.75rem' }}
            >
                Where to get?
            </Anchor>
            <Button disabled={exists} component="a" onClick={() => onSubmit(name, doApiToken)}>
                Submit
            </Button>
        </>
    )
}

export default SetupCreate
