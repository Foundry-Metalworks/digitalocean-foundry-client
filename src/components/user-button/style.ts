import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    userButtonContainer: {
        position: 'relative',
    },
    userButton: {
        display: 'block',
        width: '230px',
        height: '100%',
        maxHeight: '60px',
        padding: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        textOverflow: 'ellipsis',
        overflow: 'hidden',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}))

export default useStyles
