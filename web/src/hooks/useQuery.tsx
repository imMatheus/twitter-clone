import useSWR from 'swr'
import { getFetcher } from '@/utils/fetcher'

export function useQuery<T>(path: string) {
	const { data, error } = useSWR<T>('http://localhost:4000' + path, getFetcher)

	const isLoading = !data && !error

	return [data, error, isLoading] as const
}
