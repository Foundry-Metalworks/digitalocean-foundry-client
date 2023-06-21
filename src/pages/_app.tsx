import React from 'react'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Box, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import Loading from '@/components/shared/loading'
import useIsRouting from '@/hooks/use-is-routing'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): React.ReactNode {
    const isRouting = useIsRouting()
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    return (
        <>
            <Head>
                <title>Metalworks</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider
                        theme={{
                            colorScheme,
                            fontFamily: 'Signika, sans-serif',
                            headings: { fontFamily: 'Domine, serif' },
                        }}
                        withGlobalStyles
                        withNormalizeCSS
                    >
                        <ClerkProvider {...pageProps} appearance={{ baseTheme: dark }}>
                            <Notifications position="top-center" />
                            {isRouting ? (
                                <Box display="flex" style={{ justifyItems: 'center', alignItems: 'center' }} h="100vh">
                                    <Loading />
                                </Box>
                            ) : (
                                <Component {...pageProps} />
                            )}
                        </ClerkProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </>
    )
}
