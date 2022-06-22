import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'
import { protectedTweetRouter } from './protected'

export const tweetRouter = createRouter()
	.query('get', {
		resolve: async ({ ctx }) => {
			const tweets = await prisma.tweet.findMany({
				include: {
					owner: true
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
			console.log('tweets: ', tweets)

			return {
				tweets
			}
		}
	})
	.merge('', protectedTweetRouter)
