import React from 'react'

import { Select as MantineSelect } from '@mantine/core'

type Props = {
    values: string[]
    initialValue: string
}

const Select: React.FC<Props> = ({ values, initialValue }) => {
    return <MantineSelect value={initialValue} />
}
