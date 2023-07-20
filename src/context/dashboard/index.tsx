import React from 'react'

export enum DashboardSectionEnum {
    GAMES = 'games',
    INVITES = 'invites',
    DIGITALOCEAN = 'authorization',
}

type DashboardContextType = {
    section: DashboardSectionEnum
}

const defaultValue: DashboardContextType = {
    section: DashboardSectionEnum.GAMES,
}

const DashboardContext = React.createContext<DashboardContextType>(defaultValue)
export default DashboardContext
