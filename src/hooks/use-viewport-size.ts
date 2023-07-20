import { useCallback, useEffect, useState } from 'react'
import { BREAKPOINTS } from '@/constants'

enum DeviceType {
    DESKTOP = 'desktop',
    LAPTOP = 'laptop',
    TABLET = 'tablet',
    MOBILE_LG = 'mobileLG',
    MOBILE_MD = 'mobileMD',
    MOBILE_SM = 'mobileSM',
}

interface ViewportSize {
    width: number | undefined
    height: number | undefined
    type: DeviceType | undefined
}

export const isLargeViewport = (type: DeviceType | undefined): boolean => {
    return type === DeviceType.DESKTOP || type === DeviceType.LAPTOP
}

export const isMobileViewport = (type: DeviceType | undefined): boolean => {
    return type === DeviceType.MOBILE_LG || type === DeviceType.MOBILE_MD || type === DeviceType.MOBILE_SM
}

const useViewportSize = function (): ViewportSize {
    const [windowSize, setWindowSize] = useState<ViewportSize>({
        width: 0,
        height: 0,
        type: undefined,
    })

    const handleResize = useCallback(() => {
        // Set window width/height and type to state
        const type =
            window.innerWidth >= BREAKPOINTS.DESKTOP
                ? DeviceType.DESKTOP
                : window.innerWidth >= BREAKPOINTS.TABLET
                ? DeviceType.TABLET
                : window.innerWidth >= BREAKPOINTS.MOBILE_LG
                ? DeviceType.MOBILE_LG
                : window.innerWidth >= BREAKPOINTS.MOBILE_MD
                ? DeviceType.MOBILE_MD
                : DeviceType.MOBILE_SM
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            type,
        })
    }, [setWindowSize])

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    return windowSize
}

export default useViewportSize
