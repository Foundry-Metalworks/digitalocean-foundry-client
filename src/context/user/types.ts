export interface UserProfile {
    email?: string | undefined
    name?: string | undefined
    id?: string | undefined
    server?: string | undefined
    invites: string[]
}

export interface UserData {
    user?: UserProfile
    isAuthenticated: boolean
    isLoading: boolean
    isSetup: boolean
    error?: Error
}

interface UserDispatch {
    createServer: (name: string, doApiToken: string) => void
    joinServer: (inviteToken: string) => void
    acceptInvite: (name: string) => void
    signIn: () => void
    signOut: () => void
}

export interface UserContextType {
    data: UserData
    dispatch: UserDispatch
}
