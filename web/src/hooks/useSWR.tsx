import useSWRHook from 'swr'
import { fetcher } from '@/utils/fetcher'

export function useSWR<T>(path: string) {
    const { data, error } = useSWRHook<T>(
        'http://localhost:4000' + path,
        fetcher
    )

    const isLoading = !data && !error

    return [data, error, isLoading] as const
}
