import React, { useContext, useState } from 'react'

import { Box, Button, rem, Space, TextInput } from '@mantine/core'
import process from 'process'

import { useQuery } from '@/api/network'
import IconBrandDigitalOcean from '@/components/icons/digital-ocean'
import UserContext from '@/context/user'

type SetupCreateProps = {
    onSubmit: (name: string) => void
}

const SetupCreate: React.FC<SetupCreateProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('')
    const { data: userData } = useContext(UserContext)

    const { data, isLoading } = useQuery<{ exists: boolean }>(
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
            {!userData?.authorized ? (
                <>
                    <Button
                        radius="xl"
                        size="md"
                        component="a"
                        href={process.env.NEXT_PUBLIC_DO_URL}
                        disabled={isLoading}
                    >
                        <IconBrandDigitalOcean size={16} style={{ marginRight: rem(12) }} />
                        Connect DigitalOcean
                    </Button>
                    <Space h={rem(16)} />
                </>
            ) : null}
            <TextInput
                label="Server Name"
                placeholder="foundry"
                onChange={(e) => setName(e.target.value)}
                error={exists && 'That name is taken'}
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
