import React, { useMemo, useState } from 'react'

import { Button, TextInput } from '@mantine/core'

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
        <>
            <TextInput label="Server Token" placeholder="49QQGsdC" onChange={(e) => setServerToken(e.target.value)} />
            <Button disabled={isTokenInvalid} component="a" onClick={() => onSubmit(serverToken)}>
                Submit
            </Button>
        </>
    )
}

export default SetupJoin
