import React, { useState } from 'react'

import { Button, TextInput } from '@mantine/core'

import { useQuery } from '@/api/network'

type SetupCreateProps = {
    onSubmit: (name: string) => void
}

const SetupCreate: React.FC<SetupCreateProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('')

    const { data } = useQuery<{ exists: boolean }>(
        {
            endpoint: `/servers/${name}/check`,
            enabled: !!name,
            initialData: { exists: false },
        },
        [name],
    )
    const exists = !!data?.exists

    return (
        <>
            <TextInput
                label="Server Name"
                placeholder="foundry"
                onChange={(e) => setName(e.target.value)}
                error={exists && 'That name is taken'}
            />
            <Button disabled={exists} component="a" onClick={() => onSubmit(name)}>
                Submit
            </Button>
        </>
    )
}

export default SetupCreate
