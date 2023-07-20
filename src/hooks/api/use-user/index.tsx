import React, { useContext } from 'react'
import { UseDataType } from '@/types'
import { UserActions, UserType } from '@/hooks/api/use-user/types'
import UserContext from './context'

export const useUser = (): UseDataType<UserType, UserActions> => {
    return useContext(UserContext)
}

export default useUser
