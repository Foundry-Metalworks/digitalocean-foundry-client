import React from 'react'

import { Switch, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'

const ThemeSwitch: React.FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    return (
        <Group position="center">
            <Switch
                checked={colorScheme === 'dark'}
                onChange={() => toggleColorScheme()}
                size="lg"
                onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
                offLabel={<IconMoonStars color={theme.colors[0]} size="1.25rem" stroke={1.5} />}
            />
        </Group>
    )
}

export default ThemeSwitch
