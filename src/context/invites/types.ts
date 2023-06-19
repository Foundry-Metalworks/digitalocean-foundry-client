export interface InvitesType {
    invites: InviteType[]
}

export interface InviteType {
    id: number
    server: string
}

export interface InvitesDispatch {
    acceptInvite: (id: number) => void
}
