import type { inferQueryResponse } from '@/utils/inferQueryResponse'

export type PreviewUser = inferQueryResponse<'tweets.feed'>['tweets'][0]['owner']
export type User = inferQueryResponse<'me'>['user']
