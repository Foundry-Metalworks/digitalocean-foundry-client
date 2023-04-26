import React from 'react'

import { RedirectToSignUp } from '@clerk/nextjs'
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
    const isJoinPage = PATHS.JOIN == pathname

    const component = <Component {...pageProps} />

    return (
        <>
            <Head>
                <title>Metalworks</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <CustomUserProvider {...pageProps}>
                    <MantineProvider
                        theme={{
                            colorScheme: 'dark',
                            fontFamily: 'Signika, sans-serif',
                            headings: { fontFamily: 'Domine, serif' },
                        }}
                        withGlobalStyles
                        withNormalizeCSS
                    >
                        <MainLayout showLogo={!isSigningPage}>
                            <UserContext.Consumer>
                                {(value) => {
                                    const { data } = value
                                    const { isLoading, isAuthenticated, isSetup, error } = data
                                    if (error) {
                                        return <div>{error.message}</div>
                                    }
                                    if (isLoading) {
                                        return <Loading />
                                    }
                                    if (isAuthenticated) {
                                        if (isSetup || isSetupPage || isJoinPage) return component
                                        return <RedirectTo path={PATHS.SETUP} />
                                    }
                                    return isPublicPage ? component : <RedirectToSignUp />
                                }}
                            </UserContext.Consumer>
                        </MainLayout>
                    </MantineProvider>
                </CustomUserProvider>
            </QueryClientProvider>
        </>
    )
}
