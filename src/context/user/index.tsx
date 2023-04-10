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
    setupUser: (name: string, token: string) => void
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
        setupUser: () => undefined,
        signIn: () => undefined,
        signOut: () => undefined,
    },
}

const UserContext = createContext<UserContextType>(defaultValue)
const { Provider } = UserContext

const fetchIsSetup = async (): Promise<UserDetails> => {
    console.log('refetched isSetup')
    const { data: setup } = await bffService.get('/user/setup')
    console.log('setup data: ' + setup)
    if (!!setup) {
        const {
            data: { server },
        } = await bffService.get('/user')
        return { isSetup: true, server }
    }
    return { isSetup: false, server: '' }
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
            enabled: !!isSignedIn,
            initialData: { server: '', isSetup: false },
        }
    }, [user?.id, isSignedIn])

    console.log('query details: ' + JSON.stringify(details))
    const {
        isLoading: setupLoading,
        isFetching: setupFetching,
        data,
        error,
    } = useQuery<UserDetails>(fetchIsSetup, details)
    const { isSetup: fetchedIsSetup, server } = data as UserDetails
    const isLoading = !isLoaded || setupLoading || setupFetching
    if (!isSetup && !isLoading && fetchedIsSetup && !!server) {
        setServerName(server)
        setIsSetup(true)
    }

    const contextValue: UserContextType = useMemo(() => {
        const contextUser = isLoaded
            ? {
                  email: user?.primaryEmailAddress?.emailAddress,
                  name: user?.username || undefined,
                  id: user?.id,
                  server,
              }
            : undefined

        return {
            data: {
                user: contextUser,
                isSetup,
                isAuthenticated: isSignedIn || false,
                isLoading: isLoading,
                error: error || undefined,
            },
            dispatch: {
                setupUser: async (name: string, token: string) => {
                    await bffService.post('/server', {
                        name,
                        doToken: token,
                    })
                    await bffService.post('/user', {
                        server: name,
                    })
                    setServerName(name)
                    setIsSetup(true)
                },
                signIn: async () => {
                    await push(PATHS.SIGN_IN)
                },
                signOut: async () => {
                    await push(PATHS.HOME)
                    await signOut()
                },
            },
        }
    }, [isLoading, isSignedIn, serverName])

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
