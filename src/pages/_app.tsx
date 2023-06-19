import React from 'react'

import { RedirectToSignUp } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'

import MainLayout from '@/components/layouts/main'
import Loading from '@/components/shared/loading'
import RedirectTo from '@/components/shared/redirect'
import { AUTH_PAGES, PATHS, PUBLIC_PAGES } from '@/constants'
import UserContext, { UserProvider } from '@/context/user'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): React.ReactNode {
    const { pathname } = useRouter()
    const isPublicPage = PUBLIC_PAGES.includes(pathname)
    const isAuthPage = AUTH_PAGES.includes(pathname)
    const isSetupPage = PATHS.SETUP == pathname
    const isJoinPage = PATHS.JOIN == pathname

    const component = <Component {...pageProps} />

    return (
        <>
            <Head>
                <title>Metalworks</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <MantineProvider
                        theme={{
                            colorScheme: 'dark',
                            fontFamily: 'Signika, sans-serif',
                            headings: { fontFamily: 'Domine, serif' },
                        }}
                        withGlobalStyles
                        withNormalizeCSS
                    >
                        <MainLayout showLogo={!isAuthPage}>
                            <Notifications position="top-center" />
                            <UserContext.Consumer>
                                {(value) => {
                                    const { data, isLoading } = value
                                    if (data != null) {
                                        if (isSetupPage || isJoinPage || data.servers.length) return component
                                        return <RedirectTo path={PATHS.SETUP} />
                                    }
                                    if (isLoading) {
                                        return <Loading />
                                    }
                                    return isPublicPage ? component : <RedirectToSignUp />
                                }}
                            </UserContext.Consumer>
                        </MainLayout>
                    </MantineProvider>
                </UserProvider>
            </QueryClientProvider>
        </>
    )
}
