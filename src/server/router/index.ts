import { createRouter } from '@/server/utils/create-router'
import { tweetRouter } from './tweets'
import { usersRouter } from './users'
import { meRouter } from './me'

// Merge your api routes here
export const appRouter = createRouter().merge('tweets.', tweetRouter).merge('', meRouter).merge('users.', usersRouter)

// export type definition of API
export type AppRouter = typeof appRouter
