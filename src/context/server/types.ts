import { PermissionsType } from '@/types'

export interface ServerType {
    name: string
    permissions: PermissionsType
    users: ServerUserType[]
}

export interface ServerUserType {
    name: string
    permissions: PermissionsType
}

export interface ServerDispatch {
    create: (serverId: string) => void
    joinByToken: (inviteToken: string) => void
}
