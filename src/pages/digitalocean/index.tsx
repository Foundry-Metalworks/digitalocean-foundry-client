import React, { useEffect } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Loading from '@/components/kit/loading'
import { useUser } from '@/hooks/use-user'

const DigitalOcean: NextPage = () => {
    const { query } = useRouter()
    const {
        actions: { authorize },
    } = useUser()
    const code = query.code as string

    useEffect(() => {
        if (!!code) authorize(code)
    }, [code])

    return <Loading />
}

export default DigitalOcean
