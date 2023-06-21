export interface PermissionsType {
    canstart: boolean
    canstop: boolean
    cansave: boolean
    caninvite: boolean
}

export interface ContextType<T, R> {
    data: T
    dispatch: R
    isLoading: boolean
    error?: Error
}

export interface UseDataType<T, R> {
    data: T | undefined
    isLoading: boolean
    error?: any
    refetch: () => void
    actions?: R
}

export type ServerStatusType = 'active' | 'off' | 'deleted' | 'pending' | 'fresh' | 'new'
