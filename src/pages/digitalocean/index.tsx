import React from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useQuery } from '@/api/network'
import Loading from '@/components/shared/loading'
import RedirectTo from '@/components/shared/redirect'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/use-user'

const DigitalOcean: NextPage = () => {
    const { query } = useRouter()
    const { refetch } = useUser()
    const code = query.code

    const { isLoading } = useQuery(
        { endpoint: '/users/authorize', method: 'POST', body: { code }, enabled: !!code, onSuccess: refetch },
        [code],
    )

    if (isLoading) {
        return <Loading />
    }

    return <RedirectTo path={PATHS.HOME} />
}

export default DigitalOcean
