import React, { PropsWithChildren } from 'react'

import { Box, Title } from '@mantine/core'
import styles from './styles.module.scss'

type SectionProps = PropsWithChildren<{
    title: string
    id: string
}>

const Section: React.FC<SectionProps> = ({ title, id, children }) => {
    return (
        <Box className={styles.section} my="32px" w="100%" pos="relative" id={id}>
            <Title order={2} align="center" mb="16px">
                {title}
            </Title>
            {children}
        </Box>
    )
}

export default Section
