import { useAuth } from '@clerk/nextjs'

import { useQuery } from '@/api/network'
import { UserType } from '@/context/user/types'

export const useUser = (): { isLoading: boolean; data: UserType | undefined; error: any } => {
    const { isSignedIn, isLoaded, userId } = useAuth()

    const shouldFetchUser = isLoaded && !!isSignedIn
    const { isLoading, data, error } = useQuery<UserType>(
        {
            endpoint: '/users/me',
            enabled: shouldFetchUser,
        },
        [userId, shouldFetchUser],
    )

    return { isLoading: !isLoaded || isLoading, data, error }
}
