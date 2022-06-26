import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'
import { protectedTweetRouter } from './protected'

export const tweetRouter = createRouter()
	.query('feed', {
		resolve: async ({ ctx }) => {
			const tweets = await prisma.tweet.findMany({
				include: {
					owner: true
				},
				orderBy: {
					createdAt: 'desc'
				}
			})

			return {
				tweets
			}
		}
	})
	.query('byId', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ input }) => {
			const tweet = await prisma.tweet.findUnique({
				where: {
					id: input.id
				},
				include: {
					owner: true
				}
			})

			return {
				tweet
			}
		}
	})
	.merge('', protectedTweetRouter)
