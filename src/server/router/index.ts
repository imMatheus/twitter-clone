import { tweetRouter } from './tweets'
import { createRouter } from '@/server/utils/create-router'
import { meRouter } from './me'

// Merge your api routes here
export const appRouter = createRouter().merge('tweets.', tweetRouter).merge('', meRouter)

// export type definition of API
export type AppRouter = typeof appRouter
