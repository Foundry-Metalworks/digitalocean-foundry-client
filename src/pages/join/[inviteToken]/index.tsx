import React, { useContext, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import RedirectTo from '@/components/shared/redirect'
import { PATHS } from '@/constants'
import ServerContext from '@/context/server'

const Join: NextPage = () => {
    const router = useRouter()
    const { inviteToken } = router.query
    const {
        data,
        dispatch: { joinByToken },
    } = useContext(ServerContext)

    useEffect(() => {
        if (!!inviteToken) {
            joinByToken(inviteToken as string)
        }
    }, [inviteToken, joinByToken])

    if (!!data) return <RedirectTo path={PATHS.HOME} />
    return null
}

export default Join
