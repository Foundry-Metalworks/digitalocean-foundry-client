import React, { useMemo, useState } from 'react'

import { Box, Button, TextInput } from '@mantine/core'

type SetupJoinProps = {
    onSubmit: (token: string) => void
}

const TOKEN_LENGTH = 8
const INVALID_TOKEN_REGEX = /[^0-9a-zA-Z]/

const SetupJoin: React.FC<SetupJoinProps> = ({ onSubmit }) => {
    const [serverToken, setServerToken] = useState('')
    const isTokenInvalid = useMemo(() => {
        return serverToken.length != TOKEN_LENGTH || INVALID_TOKEN_REGEX.test(serverToken)
    }, [serverToken])

    return (
        <Box ta="center">
            <TextInput
                label="Server Token"
                placeholder="49QQGsdC"
                error={serverToken && isTokenInvalid ? 'Invalid Token' : null}
                onChange={(e) => setServerToken(e.target.value)}
            />
            <br />
            <Button disabled={isTokenInvalid} component="a" onClick={() => onSubmit(serverToken)} w="100%">
                Submit
            </Button>
        </Box>
    )
}

export default SetupJoin
