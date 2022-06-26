import type { inferQueryResponse } from '@/utils/inferQueryResponse'

export type Tweets = inferQueryResponse<'tweets.feed'>['tweets']
export type Tweet = Tweets[number]
