import React from 'react'

import Dropdown from '@/components/kit/dropdown'
import { PATHS } from '@/constants'
import { useUser } from '@/hooks/api/use-user'

type Props = {
    text: string
    labelType?: 'link' | 'button'
}

const PanelButton: React.FC<Props> = ({ text, labelType = 'button' }) => {
    const { data, isLoading } = useUser()
    const servers = data?.servers || []

    if (isLoading) return null

    const links = servers.map((s) => ({ label: s.name, href: `${PATHS.PANEL}/${s.name}` }))
    return <Dropdown label={text} labelType={labelType} links={links} />
}

export default PanelButton
