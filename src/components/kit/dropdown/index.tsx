import React, { useState } from 'react'

import { Button, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useViewportSize } from '@mantine/hooks'
import { BREAKPOINTS } from '@/constants'

type Props = {
    label: string
    labelType?: 'link' | 'button'
    links: { label: string; href: string }[]
}

const Dropdown: React.FC<Props> = ({ label, links, labelType = 'button' }) => {
    const [open, setIsOpen] = useState(false)
    const { push } = useRouter()
    const { width } = useViewportSize()
    const isPhone = width <= BREAKPOINTS.TABLET

    const target =
        labelType == 'button' ? (
            <Button radius="xl" size="md" fullWidth>
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
            <Menu onChange={setIsOpen} opened={open} width={200} position={isPhone ? 'bottom' : 'bottom-start'}>
                <Menu.Target>{target}</Menu.Target>
                <Menu.Dropdown w={rem(320)}>
                    {links.map(({ href, label: linkText }, i) => (
                        <Menu.Item key={`dropdown-label-${label}-entry-${i}`} component="a" onClick={() => push(href)}>
                            <Text>{linkText}</Text>
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export default Dropdown
