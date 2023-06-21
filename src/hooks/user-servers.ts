import { useContext, useMemo } from 'react'

import { useQuery } from '@/api/network'
import { ServerType } from '@/context/server/types'
import UserContext from '@/context/user'
import { UseDataType } from '@/types'

export const useServers = (server: string): UseDataType<ServerType> => {
    const { isLoading } = useContext(UserContext)
    const { isFetching, data, error, refetch } = useQuery<ServerType>(
        {
            endpoint: `/servers/${server}`,
        },
        [server],
    )

    const loading = !!server ? isLoading || isFetching : false
    const value = useMemo(
        () => ({
            isLoading: loading,
            data: loading ? undefined : data,
            error: error || undefined,
            refetch,
        }),
        [server, loading, error],
    )
    return value
}

export default useServers
