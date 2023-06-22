import React, { PropsWithChildren } from 'react'

import { Box, Title } from '@mantine/core'

type SectionProps = PropsWithChildren<{
    title: string
}>

import styles from './styles.module.scss'

const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <Box className={styles.section} my="32px" w="100%">
            <Title order={2} align="center" mb="16px">
                {title}
            </Title>
            {children}
        </Box>
    )
}

export default Section
