import React, { PropsWithChildren } from 'react'

import { Box, Container, Title } from '@mantine/core'

type SectionProps = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
    title: string
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
    return (
        <Box className={className} my="32px" w="100%">
            <Title order={2} align="center" mb="16px">
                {title}
            </Title>
            {children}
        </Box>
    )
}

export default Section
