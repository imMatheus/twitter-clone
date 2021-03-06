import { createRouter } from '@/server/utils/create-router'
import { tweetRouter } from './tweets'
import { usersRouter } from './users'
import { messagesRouter } from './messages'
import { notificationsRouter } from './notifications'
import { meRouter } from './me'
import { trendsRouter } from './trends'
import { exploreRouter } from './explore'

// Merge your api routes here
export const appRouter = createRouter()
	.merge('tweets.', tweetRouter)
	.merge('messages.', messagesRouter)
	.merge('notifications.', notificationsRouter)
	.merge('users.', usersRouter)
	.merge('explore.', exploreRouter)
	.merge('trends.', trendsRouter)
	.merge('', meRouter)

// export type definition of API
export type AppRouter = typeof appRouter
