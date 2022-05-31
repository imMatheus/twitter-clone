import useSWR from 'swr'
import axios from 'axios'
import { server } from '@/constants'

export function useMutation<T>() {
	// const postFetcher = (url: string, data: { [key: string]: any }) => axios.post(url, data).then((res) => res.data)
	// const { data, error } = useSWR<T>(server + path, postFetcher)

	// const isLoading = !data && !error

	const func = async (path: string, options: { [key: string]: any }) => await axios.post(server + path, options)

	return func
}
