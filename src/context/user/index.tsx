import React, { createContext, PropsWithChildren, useMemo, useState } from 'react'

import { ClerkProvider, useClerk, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'

import { bffService, QueryDetails, useQuery } from '@/api/network'
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

const fetchIsSetup = async (): Promise<UserDetails> => {
    console.log('refetched isSetup')
    const {
        data: { server },
    } = await bffService.get('/server')
    return { isSetup: !!server, server: server || '' }
}

function InnerUserProvider({ children }: PropsWithChildren) {
    const { push } = useRouter()
    const { signOut } = useClerk()
    const { isLoaded, isSignedIn, user } = useUser()
    const [serverName, setServerName] = useState('')
    const [isSetup, setIsSetup] = useState(false)

    const details: QueryDetails<UserDetails> = useMemo(() => {
        return {
            key: `user-setup-${user?.id}`,
            enabled: !!isSignedIn && !isSetup,
            initialData: { server: '', isSetup: false },
        }
    }, [user?.id, isSignedIn, isSetup])

    console.log('query details: ' + JSON.stringify(details))
    const {
        isLoading: setupLoading,
        isFetching: setupFetching,
        data,
        error,
    } = useQuery<UserDetails>(fetchIsSetup, details)
    const { isSetup: fetchedIsSetup, server: fetchedServer } = data as UserDetails
    const isLoading = !isLoaded || setupLoading || setupFetching
    if (!isSetup && !isLoading && fetchedIsSetup && !!fetchedServer) {
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
                    await bffService.post('/server/create', { name, doApiToken })
                    setServerName(name)
                    setIsSetup(true)
                },
                joinServer: async (inviteToken: string) => {
                    const {
                        data: { server },
                    } = await bffService.post('/server/join', { inviteToken })
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
