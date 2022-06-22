import type { inferQueryResponse } from '@/utils/inferQueryResponse'

export type Tweets = inferQueryResponse<'tweets.get'>['tweets']
export type Tweet = Tweets[number]
