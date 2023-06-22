import React from 'react'

import { Loader, MantineSize } from '@mantine/core'

import styles from './styles.module.scss'

const Loading: React.FC<{ size?: MantineSize }> = ({ size = 'xl' }) => <Loader className={styles.loader} size={size} />

export default Loading
