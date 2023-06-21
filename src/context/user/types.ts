import { PermissionsType } from '@/types'

export interface UserType {
    email: string
    name: string
    id: string
    servers: UserServerType[]
    authorized: boolean
}

export interface UserServerType {
    name: string
    permissions: PermissionsType
}

export interface UserDispatch {
    authorize: (code: string) => void
}
