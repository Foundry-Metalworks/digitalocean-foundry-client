import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

const useIsRouting = () => {
    const { events } = useRouter()
    const [isRouting, setIsRouting] = useState(false)

    useEffect(() => {
        const onStart = () => setIsRouting(true)
        const onStop = () => setIsRouting(false)
        events.on('routeChangeStart', onStart)
        events.on('routeChangeComplete', onStop)
        events.on('routeChangeError', onStop)

        return () => {
            events.off('routeChangeStart', onStart)
            events.off('routeChangeComplete', onStop)
            events.off('routeChangeError', onStop)
        }
    })

    return isRouting
}

export default useIsRouting
