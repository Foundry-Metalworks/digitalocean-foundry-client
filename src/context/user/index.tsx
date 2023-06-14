import React, { createContext, PropsWithChildren, useMemo, useState } from 'react'

import { ClerkProvider, useAuth, useClerk, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useRouter } from 'next/router'

import { query, useQuery } from '@/api/network'
import { PATHS } from '@/constants'
import { UserContextType, UserProfile } from '@/context/user/types'

const defaultValue: UserContextType = {
    data: {
        isAuthenticated: false,
        isSetup: false,
        isLoading: true,
    },
    dispatch: {
        createServer: () => undefined,
        joinServer: () => undefined,
        acceptInvite: () => undefined,
        signIn: () => undefined,
        signOut: () => undefined,
    },
}

const UserContext = createContext<UserContextType>(defaultValue)
const { Provider } = UserContext

function InnerUserProvider({ children }: PropsWithChildren) {
    const { push } = useRouter()
    const { signOut } = useClerk()
    const { isLoaded, isSignedIn, user } = useUser()
    const { getToken } = useAuth()
    const [name, setName] = useState('')

    const {
        isLoading: serverLoading,
        data: serverData,
        error: serverError,
    } = useQuery<{ server: string }>({
        endpoint: '/server',
        key: `server-${user?.id}`,
        enabled: isLoaded && !!isSignedIn,
    })
    if (isLoaded && isSignedIn && !serverLoading && !!serverData?.server && !name) {
        setName(serverData.server)
    }

    const {
        isLoading: inviteLoading,
        data: inviteData,
        error: inviteError,
    } = useQuery<{ invites: string[] }>({
        endpoint: '/user/invites',
        key: `invites-${user?.id}`,
        enabled: !serverLoading && !!serverData && !name,
    })

    // Context value
    const isLoading = !isLoaded || serverLoading || inviteLoading
    const error = serverError || inviteError
    const contextUser: UserProfile | undefined = useMemo(() => {
        return !isLoading
            ? {
                  email: user?.primaryEmailAddress?.emailAddress,
                  name: user?.username || undefined,
                  id: user?.id,
                  server: name,
                  invites: inviteData?.invites || [],
              }
            : undefined
    }, [isLoading, user?.id, name, inviteData?.invites])
    const contextValue: UserContextType = useMemo(() => {
        return {
            data: {
                user: contextUser,
                isAuthenticated: isSignedIn || false,
                isLoading: isLoading,
                isSetup: !!name,
                error: error || undefined,
            },
            dispatch: {
                createServer: async (name: string, doApiToken: string) => {
                    const token = await getToken()
                    await query({ endpoint: '/server/create', method: 'POST', body: { name, doApiToken }, token })
                    setName(name)
                    await push(PATHS.HOME)
                },
                joinServer: async (inviteToken: string) => {
                    const token = await getToken()
                    const { server } = await query<{ server: string }>({
                        endpoint: '/server/join',
                        method: 'POST',
                        body: { inviteToken },
                        token,
                    })
                    setName(server)
                    await push(PATHS.HOME)
                },
                acceptInvite: async (server: string) => {
                    const token = await getToken()
                    await query({
                        endpoint: '/user/invites/accept',
                        method: 'POST',
                        body: { server },
                        token,
                    })
                    setName(server)
                    await push(PATHS.HOME)
                },
                signIn: async () => {
                    await push(PATHS.SIGN_IN)
                },
                signOut: async () => {
                    await signOut()
                    await push(PATHS.HOME)
                },
            },
        }
    }, [contextUser?.id, isSignedIn, isLoading, name, error])

    return <Provider value={contextValue}>{children}</Provider>
}

export const CustomUserProvider: React.FC<PropsWithChildren<any>> = ({ children, ...rest }: PropsWithChildren<any>) => {
    return (
        <ClerkProvider {...rest} appearance={{ baseTheme: dark }}>
            <InnerUserProvider>{children}</InnerUserProvider>
        </ClerkProvider>
    )
}
export default UserContext
