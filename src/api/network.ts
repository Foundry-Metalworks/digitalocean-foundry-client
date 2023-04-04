import axios from 'axios'
import * as process from 'process'
import { useQuery as useQueryHook } from 'react-query'
import { UseQueryResult } from 'react-query/types/react/types'

const isServer = typeof window === 'undefined'

const bffEndpoint = isServer ? process.env.BFF_ENDPOINT : process.env.NEXT_PUBLIC_BFF_ENDPOINT
export const bffService = axios.create({
    baseURL: bffEndpoint,
})

export type QueryDetails<T> = {
    key: string
    enabled?: boolean
    initialData?: T
}

export function useQuery<TQueryFnData>(
    func: () => Promise<TQueryFnData>,
    details: QueryDetails<TQueryFnData>,
): UseQueryResult<TQueryFnData, Error | undefined> {
    const { key, enabled, initialData } = details
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
