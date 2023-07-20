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

export type QueryDetails<T> = {
    endpoint: string
    token: string | null
    method?: Method
    params?: any
    body?: any
}

export type UseQueryDetails<T> = Omit<QueryDetails<T>, 'token'> & {
    enabled?: boolean
    initialData?: T
    postFetch?: (data: T) => T | Promise<T>
    onSuccess?: (data: T) => void
    refetchInterval?: number | false
    refetchOnRevisit?: boolean
}

export async function query<TQueryFnData>(details: QueryDetails<TQueryFnData>): Promise<TQueryFnData> {
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
    key: string,
    details: UseQueryDetails<TQueryFNData>,
    dependencies: any[],
): UseQueryResult<TQueryFNData, Error> {
    const {
        endpoint,
        method,
        enabled,
        initialData,
        params,
        body,
        onSuccess,
        refetchInterval,
        refetchOnRevisit,
        postFetch,
    } = details
    const { getToken } = useAuth()

    const func = async () => {
        const token = await getToken()
        const fetchData = await query<TQueryFNData>({ endpoint, method, params, body, token })
        return postFetch ? await postFetch(fetchData) : fetchData
    }

    return useQueryHook<TQueryFNData, Error>([key, ...dependencies], func, {
        keepPreviousData: true,
        initialData: initialData,
        refetchOnMount: refetchOnRevisit || false,
        refetchOnWindowFocus: refetchOnRevisit || false,
        refetchOnReconnect: refetchOnRevisit || false,
        retry: false,
        retryOnMount: false,
        retryDelay: 0,
        refetchInterval,
        onSuccess,
        enabled,
    })
}
