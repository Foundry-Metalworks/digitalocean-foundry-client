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
