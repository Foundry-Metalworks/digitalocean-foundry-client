import React from 'react'

import { RedirectToSignIn } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'

import MainLayout from '@/components/layouts/main'
import Loading from '@/components/loading'
import RedirectTo from '@/components/redirect'
import { AUTH_PAGES, PATHS, PUBLIC_PAGES } from '@/constants'
import UserContext, { CustomUserProvider } from '@/context/user'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): React.ReactNode {
    const { pathname } = useRouter()
    const isPublicPage = PUBLIC_PAGES.includes(pathname)
    const isSetupPage = PATHS.SETUP == pathname
    const isSigningPage = AUTH_PAGES.includes(pathname)

    const component = <Component {...pageProps} />

    return (
        <>
            <Head>
                <title>Metalworks</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Signika" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Domine" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <CustomUserProvider {...pageProps}>
                    <MantineProvider
                        theme={{
                            colorScheme: 'dark',
                            fontFamily: 'Signika, Palatino Linotype, sans-serif',
                            headings: { fontFamily: 'Domine, serif' },
                        }}
                        withGlobalStyles
                        withNormalizeCSS
                    >
                        <MainLayout showLogo={!isSigningPage}>
                            <UserContext.Consumer>
                                {(value) => {
                                    const { data } = value
                                    const { isLoading, isAuthenticated, isSetup } = data
                                    if (isLoading) {
                                        return <Loading />
                                    }
                                    if (isAuthenticated) {
                                        if (isSetup || isSetupPage) return component
                                        return <RedirectTo path={PATHS.SETUP} />
                                    }
                                    return isPublicPage ? component : <RedirectToSignIn />
                                }}
                            </UserContext.Consumer>
                        </MainLayout>
                    </MantineProvider>
                </CustomUserProvider>
            </QueryClientProvider>
        </>
    )
}
