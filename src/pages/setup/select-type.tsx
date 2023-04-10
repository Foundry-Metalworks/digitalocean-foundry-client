import React from 'react'

import { Button } from '@mantine/core'

type SelectTypeProps = {
    onTypeSelected: (type: 'create' | 'join') => void
}

const SelectType: React.FC<SelectTypeProps> = ({ onTypeSelected }) => {
    return (
        <>
            <Button component="a" onClick={() => onTypeSelected('create')}>
                Create Server
            </Button>
            <Button component="a" onClick={() => onTypeSelected('join')}>
                Join Server
            </Button>
        </>
    )
}

export default SelectType
