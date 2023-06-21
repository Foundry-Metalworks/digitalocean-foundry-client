import React from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useQuery } from '@/api/network'
import MainLayout from '@/components/layouts/main'
import Loading from '@/components/shared/loading'
import RedirectTo from '@/components/shared/redirect'
import { PATHS } from '@/constants'

const DigitalOcean: NextPage = () => {
    const { query } = useRouter()
    const code = query.code

    const { status } = useQuery({ endpoint: '/users/authorize', method: 'POST', body: { code }, enabled: !!code }, [
        code,
    ])

    return status == 'success' ? (
        <RedirectTo path={PATHS.HOME} />
    ) : (
        <MainLayout>
            <Loading />
        </MainLayout>
    )
}

export default DigitalOcean
