import axios from 'axios'

export const getFetcher = (url: string) => axios.get(url).then((res) => res.data)

export const postFetcher = (url: string, data: { [key: string]: any }) => axios.post(url, data).then((res) => res.data)
