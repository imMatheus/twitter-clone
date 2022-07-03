import type { inferQueryResponse } from '@/utils/inferQueryResponse'

export type Tweets =
	| inferQueryResponse<'tweets.feed'>['tweets']
	| inferQueryResponse<'tweets.getRepliesById'>['replies']
export type Tweet = Tweets[number]
