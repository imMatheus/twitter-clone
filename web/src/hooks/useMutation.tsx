import useSWR from 'swr'
import { postFetcher } from '@/utils/fetcher'
import { server } from '@/constants'

export function useMutation<T>(path: string, options: { [key: string]: any }) {
	const { data, error } = useSWR<T>(server + path, postFetcher)

	const isLoading = !data && !error

	return [data, error, isLoading] as const
}
