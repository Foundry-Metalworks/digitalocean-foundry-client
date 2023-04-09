import React from 'react'

import { Loader } from '@mantine/core'

import styles from './styles.module.scss'

const Loading: React.FC = () => <Loader className={styles.loader} size="xl" />

export default Loading
