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
    enabled?: boolean
    initialData?: T
    onSuccess?: (data: T) => void
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

export function useQuery<TQueryFNData>(
    details: UseQueryDetails<TQueryFNData>,
    dependencies: any[],
): UseQueryResult<TQueryFNData, Error> {
    const { endpoint, method, enabled, initialData, params, body, onSuccess } = details
    const key = `${endpoint}--${dependencies.map((e) => (e ? JSON.stringify(e) : 'null')).join('-')}`
    const { getToken } = useAuth()

    const func = async () => {
        const token = await getToken()
        return await query<TQueryFNData>({ endpoint, method, params, body, token })
    }
    return useQueryHook<TQueryFNData, Error>(key, func, {
        keepPreviousData: true,
        initialData: initialData,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        retryDelay: 0,
        onSuccess,
        enabled,
    })
}
