import React, { createContext, PropsWithChildren, useMemo, useState } from 'react'

import { ClerkProvider, useAuth, useClerk, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'

import { query, useQuery, UseQueryDetails } from '@/api/network'
import { PATHS } from '@/constants'

export interface UserProfile {
    email?: string | undefined
    name?: string | undefined
    id?: string | undefined
    server?: string | undefined
}

export interface UserData {
    user?: UserProfile
    isSetup: boolean
    isAuthenticated: boolean
    isLoading: boolean
    error?: Error
}

interface UserDetails {
    server: string
    isSetup: boolean
}

interface UserDispatch {
    createServer: (name: string, doApiToken: string) => void
    joinServer: (inviteToken: string) => void
    signIn: () => void
    signOut: () => void
}

interface UserContextType {
    data: UserData
    dispatch: UserDispatch
}

const defaultValue: UserContextType = {
    data: {
        isSetup: false,
        isAuthenticated: false,
        isLoading: true,
    },
    dispatch: {
        createServer: () => undefined,
        joinServer: () => undefined,
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
    const [serverName, setServerName] = useState('')
    const [isSetup, setIsSetup] = useState(false)

    const details: UseQueryDetails<UserDetails> = useMemo(() => {
        return {
            endpoint: '/server',
            key: `user-setup-${user?.id}`,
            enabled: !!isSignedIn && !isSetup,
            initialData: { server: '', isSetup: false },
        }
    }, [user?.id, isSignedIn, isSetup])

    console.log('query details: ' + JSON.stringify(details))
    const { isLoading: setupLoading, isFetching: setupFetching, data, error } = useQuery<{ server: string }>(details)
    const fetchedServer: string | undefined = data?.server
    const isLoading = !isLoaded || setupLoading || setupFetching
    if (!isSetup && !isLoading && !!fetchedServer) {
        setServerName(fetchedServer)
        setIsSetup(true)
    }

    const contextUser = useMemo(() => {
        return isLoaded
            ? {
                  email: user?.primaryEmailAddress?.emailAddress,
                  name: user?.username || undefined,
                  id: user?.id,
                  server: serverName,
              }
            : undefined
    }, [isLoaded, user?.id, serverName])

    const contextValue: UserContextType = useMemo(() => {
        return {
            data: {
                user: contextUser,
                isSetup,
                isAuthenticated: isSignedIn || false,
                isLoading: isLoading,
                error: error || undefined,
            },
            dispatch: {
                createServer: async (name: string, doApiToken: string) => {
                    const token = await getToken()
                    await query({ endpoint: '/server/create', method: 'POST', body: { name, doApiToken }, token })
                    setServerName(name)
                    setIsSetup(true)
                },
                joinServer: async (inviteToken: string) => {
                    const token = await getToken()
                    const { server } = await query<{ server: string }>({
                        endpoint: '/server/join',
                        method: 'POST',
                        body: { inviteToken },
                        token,
                    })
                    setServerName(server)
                    setIsSetup(true)
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
    }, [contextUser?.id, serverName, isSignedIn, isLoading, error])

    console.log('rerendered provider: ' + JSON.stringify(contextValue))
    return <Provider value={contextValue}>{children}</Provider>
}

export const CustomUserProvider: React.FC<PropsWithChildren> = ({ children, ...rest }: PropsWithChildren<any>) => {
    return (
        <ClerkProvider {...rest}>
            <InnerUserProvider>{children}</InnerUserProvider>
        </ClerkProvider>
    )
}
export default UserContext
