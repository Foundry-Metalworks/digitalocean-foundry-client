import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

type RedirectProps = { path: string; replace?: boolean }

function RedirectTo({ path, replace }: RedirectProps): React.ReactNode {
    const { push, replace: replaceRoute } = useRouter()
    useEffect(() => {
        if (replace) replaceRoute(path)
        else push(path)
    }, [path, push, replace, replaceRoute])

    return null
}

export default RedirectTo
