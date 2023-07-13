import React from 'react'
import { BREAKPOINTS } from '@/constants'
import { useViewportSize } from '@mantine/hooks'
import DropdownDesktop from '@/components/user-button/components/dropdown/desktop'
import DropdownMobile from '@/components/user-button/components/dropdown/mobile'

export type DropdownProps = {
    isSignedIn: boolean
    onSignOut: () => void
}

const Dropdown: React.FC<DropdownProps> = ({ isSignedIn, onSignOut }) => {
    const { width } = useViewportSize()
    const isMobile = width <= BREAKPOINTS.TABLET

    if (isMobile) return <DropdownMobile isSignedIn={isSignedIn} onSignOut={onSignOut} />
    return <DropdownDesktop isSignedIn={isSignedIn} onSignOut={onSignOut} />
}

export default Dropdown
