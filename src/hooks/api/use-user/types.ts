import { PermissionsType } from '@/types'

export interface UserType {
    email: string
    name: string
    id: string
    imageUrl: string
    servers: UserServerType[]
    authorized: boolean
}

export interface UserServerType {
    name: string
    permissions: PermissionsType
}

export interface UserActions {
    authorize: (code: string) => void
    unauthorize: () => void
}
