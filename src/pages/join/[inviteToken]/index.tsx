import React, { useContext, useEffect } from 'react'

import { RedirectToSignUp, useAuth } from '@clerk/nextjs'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Loading from '@/components/shared/loading'
import ServerContext, { ServerProvider } from '@/context/server'

const UnwrappedJoin: NextPage = () => {
    const { asPath, query } = useRouter()
    const { inviteToken } = query
    const { isSignedIn, isLoaded } = useAuth()
    const {
        dispatch: { joinByToken },
    } = useContext(ServerContext)

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            console.log('JOINING')
            joinByToken(inviteToken as string)
        }
    }, [isLoaded, isSignedIn, joinByToken])

    console.log('isLoaded: ' + isLoaded)
    if (isLoaded && !isSignedIn) return <RedirectToSignUp redirectUrl={asPath} />
    return <Loading />
}

const Join: NextPage = () => {
    return (
        <ServerProvider>
            <UnwrappedJoin />
        </ServerProvider>
    )
}

export default Join
