import React, { useContext, useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import RedirectTo from '@/components/redirect'
import { PATHS } from '@/constants'
import UserContext from '@/context/user'

const Join: NextPage = () => {
    const router = useRouter()
    const { inviteToken } = router.query
    const {
        data: { isSetup },
        dispatch: { joinServer },
    } = useContext(UserContext)

    useEffect(() => {
        if (!isSetup && !!inviteToken) {
            joinServer(inviteToken as string)
        }
    }, [isSetup, inviteToken, joinServer])

    if (isSetup) return <RedirectTo path={PATHS.HOME} />
    return null
}

export default Join
