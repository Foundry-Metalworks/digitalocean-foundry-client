import React from 'react'

import { Loader } from '@mantine/core'

import styles from './styles.module.scss'

function Loading(): React.ReactNode {
    return <Loader className={styles.loader} size="xl" />
}

export default Loading
