import React, { useEffect } from 'react'

import { RedirectToSignUp, useAuth } from '@clerk/nextjs'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Loading from '@/components/kit/loading'
import useServer from '@/hooks/api/use-server'

const Join: NextPage = () => {
    const { asPath, query } = useRouter()
    const { inviteToken } = query
    const { isSignedIn, isLoaded } = useAuth()
    const {
        actions: { joinByToken },
    } = useServer(null)

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            joinByToken(inviteToken as string)
        }
    }, [isLoaded, isSignedIn, joinByToken])

    if (isLoaded && !isSignedIn) return <RedirectToSignUp redirectUrl={asPath} />
    return <Loading />
}

export default Join
