import React, { useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Loading from '@/components/kit/loading'
import { useUser } from '@/hooks/api/use-user'
import { RedirectToSignIn, useAuth } from '@clerk/nextjs'

const DigitalOcean: NextPage = () => {
    const { query, asPath } = useRouter()
    const { isSignedIn } = useAuth()
    const {
        actions: { authorize },
    } = useUser()
    const code = query.code as string

    useEffect(() => {
        if (isSignedIn && !!code) authorize(code)
    }, [code, isSignedIn])

    if (isSignedIn == false) return <RedirectToSignIn redirectUrl={asPath} />

    return <Loading />
}

export default DigitalOcean
