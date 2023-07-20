import React from 'react'

import { Title } from '@mantine/core'
import styles from './styles.module.scss'

type Props = {
    size: string
    hidden?: boolean
    withText?: boolean
    center?: boolean
}

const FoundryLogo: React.FC<Props> = ({ size, hidden = false, withText = false, center = true }) => {
    return (
        <div className={styles.logo}>
            <img
                src="/logo512.png"
                alt="Foundry Logo"
                style={{ display: hidden ? 'none' : 'inherit', width: size, margin: center ? '0 auto' : undefined }}
            />
            {withText && (
                <Title pl="4px" order={5}>
                    METALWORKS
                </Title>
            )}
        </div>
    )
}

export default FoundryLogo
