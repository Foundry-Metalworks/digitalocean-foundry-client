import { useAuth } from '@clerk/nextjs'
import { notifications } from '@mantine/notifications'
import axios, { Method } from 'axios'
import * as process from 'process'
import { useQuery as useQueryHook } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

const isServer = typeof window === 'undefined'

const bffEndpoint = isServer ? process.env.BFF_ENDPOINT : process.env.NEXT_PUBLIC_BFF_ENDPOINT
const bffService = axios.create({
    baseURL: bffEndpoint,
})

export type QueryDetails = {
    endpoint: string
    token: string | null
    method?: Method
    params?: any
    body?: any
}

export type UseQueryDetails<T> = Omit<QueryDetails, 'token'> & {
    key: string
    enabled?: boolean
    initialData?: T
}

export async function query<TQueryFnData>(details: QueryDetails): Promise<TQueryFnData> {
    const { endpoint, method, token, params, body } = details
    try {
        const result = await bffService.request({
            method: method || 'get',
            url: endpoint,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: body,
            params,
            timeout: 120000,
        })
        return result.data
    } catch (err: any) {
        const errorDataMessage = err.response.data.error?.message
        notifications.show({ message: errorDataMessage || err.message, color: 'red' })
        throw err
    }
}

export function useQuery<TQueryFnData>(
    details: UseQueryDetails<TQueryFnData>,
): UseQueryResult<TQueryFnData, Error | undefined> {
    const { key, endpoint, method, enabled, initialData, params, body } = details
    const { getToken } = useAuth()
    const func = async () => {
        const token = await getToken()
        return await query<TQueryFnData>({ endpoint, method, params, body, token })
    }
    return useQueryHook<TQueryFnData, Error | undefined>(key, func, {
        refetchOnMount: false,
        retryDelay: 0,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        retry: false,
        keepPreviousData: true,
        initialData: initialData,
        enabled,
    })
}
