import React, { useState } from 'react'

import { Box, Button, TextInput } from '@mantine/core'

import { useQuery } from '@/api/network'
import DOSetup from '@/components/shared/digitalocean-setup'
import { useUser } from '@/hooks/use-user'

type SetupCreateProps = {
    onSubmit: (name: string) => void
}

const SetupCreate: React.FC<SetupCreateProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('')
    const { data: userData } = useUser()

    const { data, isLoading } = useQuery<{ exists: boolean }>(
        'checkServer',
        {
            endpoint: `/servers/${name}/check`,
            enabled: !!name,
            initialData: { exists: false },
        },
        [name],
    )
    const exists = !!data?.exists

    return (
        <Box ta="center">
            <DOSetup />
            <br />
            <TextInput
                label="Server Name"
                placeholder="foundry"
                onChange={(e) => setName(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && onSubmit(name)}
                error={exists && 'That name is taken'}
                data-autofocus
            />
            <br />
            <Button
                disabled={!name || exists || (!isLoading && !userData?.authorized)}
                component="a"
                onClick={() => onSubmit(name)}
                w="100%"
            >
                Submit
            </Button>
        </Box>
    )
}

export default SetupCreate
