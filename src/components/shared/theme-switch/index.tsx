import React from 'react'

import { Group, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

const ThemeSwitch: React.FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    return (
        <Group position="center" w="min-content">
            <Switch
                checked={colorScheme === 'dark'}
                onChange={() => toggleColorScheme()}
                w="min-content"
                size="lg"
                onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
                offLabel={<IconMoonStars color={theme.colors['dark'][0]} size="1.25rem" stroke={1.5} />}
            />
        </Group>
    )
}

export default ThemeSwitch
