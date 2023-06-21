import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import Loading from '@/components/shared/loading'

type RedirectProps = { path: string; replace?: boolean }

const RedirectTo: React.FC<RedirectProps> = ({ path, replace }: RedirectProps) => {
    const { push, replace: replaceRoute } = useRouter()
    useEffect(() => {
        if (replace) replaceRoute(path)
        else push(path)
    }, [path, push, replace, replaceRoute])

    return <Loading />
}

export default RedirectTo
