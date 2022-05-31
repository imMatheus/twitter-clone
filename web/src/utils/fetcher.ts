import axios from 'axios'

export const getFetcher = (url: string) => axios.get(url).then((res) => res.data)
