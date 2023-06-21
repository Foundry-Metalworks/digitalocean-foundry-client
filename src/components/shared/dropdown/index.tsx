import React, { PropsWithChildren, useState } from 'react'

import { Box, Button, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import Link, { LinkProps } from 'next/link'

type Props = {
    label: string
    labelType?: 'link' | 'button'
    children: React.ReactElement<LinkProps> | React.ReactElement<LinkProps>[]
}

const Dropdown: React.FC<Props> = ({ label, children, labelType = 'button' }) => {
    const [open, setIsOpen] = useState(false)

    const target =
        labelType == 'button' ? (
            <Button radius="xl" size="md">
                {label} <IconChevronDown />
            </Button>
        ) : (
            <UnstyledButton>
                <Group spacing={0}>
                    {label} <IconChevronDown />
                </Group>
            </UnstyledButton>
        )

    return (
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Menu onChange={setIsOpen} opened={open} width={200} position="bottom-start">
                <Menu.Target>{target}</Menu.Target>
                <Menu.Dropdown w={rem(320)}>
                    {[...children].map((l, i) => (
                        <Menu.Item key={`dropdown-${label}-entry-${i}`}>{l}</Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export default Dropdown
