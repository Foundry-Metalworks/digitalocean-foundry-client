import { useContext, useMemo } from 'react'

import { useQuery } from '@/api/network'
import { ServerType } from '@/context/server/types'
import UserContext from '@/context/user'

export const useServers = (server: string): { isLoading: boolean; data: ServerType | null; error: any } => {
    const { isLoading } = useContext(UserContext)
    const { isFetching, data, error } = useQuery<ServerType>(
        {
            endpoint: `/servers/${server}`,
            enabled: !!server,
        },
        [server],
    )

    const loading = !!server ? isLoading || isFetching : false
    const value = useMemo(
        () => ({
            isLoading: loading,
            data: loading ? null : data || null,
            error: error || undefined,
        }),
        [server, loading, error],
    )
    return value
}
