import { PermissionsType } from '@/types'

export interface UserType {
    email: string
    name: string
    id: string
    servers: UserServerType[]
}

export interface UserServerType {
    name: string
    permissions: PermissionsType
}
