import { useAuth } from '@clerk/nextjs'

import { useQuery } from '@/api/network'
import { UserType } from '@/context/user/types'
import { UseDataType } from '@/types'

export const useUser = (): UseDataType<UserType> => {
    const { isSignedIn, isLoaded, userId } = useAuth()

    const shouldFetchUser = isLoaded && !!isSignedIn
    const { isLoading, data, error, refetch } = useQuery<UserType>(
        {
            endpoint: '/users/me',
            enabled: shouldFetchUser,
        },
        [userId, shouldFetchUser],
    )

    return { isLoading: !isLoaded || isLoading, data, error, refetch }
}
