import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export function useQuery<T>(path: string) {
	const { data, error } = useSWR<T>('http://localhost:4000' + path, fetcher)

	const isLoading = !data && !error

	return [data, error, isLoading] as const
}
