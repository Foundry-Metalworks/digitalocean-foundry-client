import { UserType } from '@/hooks/api/use-user/types'
import useLocalStorage from '@/hooks/use-local-storage'

const USER_DATA_KEY = 'UserType'
const USER_ID_KEY = 'UserId'

export const useCachedId = (): [string | undefined, (data: string | undefined) => void] => {
    return useLocalStorage<string>(USER_ID_KEY)
}

export const useCachedUser = (): [UserType | undefined, (data: UserType | undefined) => void] => {
    return useLocalStorage<UserType>(USER_DATA_KEY)
}
