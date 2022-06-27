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
	.query('search', {
		input: z.object({
			text: z.string()
		}),
		resolve: async ({ input }) => {
			console.log('abc')
			console.log(input)

			const maxResults = 10

			// Have to use queryRaw because "LIKE" is not supported in prisma yet
			// const ids = await prisma.$queryRaw<{ id: string }[]>`
			// SELECT id FROM Tweet
			// WHERE text LIKE '%e%'
			// LIMIT ${maxResults}
			// ;`

			// console.log('ids')
			// console.log(ids)

			// const tweets = await prisma.tweet.findMany({
			// 	where: { id: { in: ids.map((row) => row.id) } }
			// })

			const tweets = await prisma.tweet.findMany({
				where: {
					text: {
						search: input.text || 'tilte'
						// search: input.text
					}
				},
				include: {
					owner: true
				}
			})

			console.log(tweets)

			return {
				tweets
			}
		}
	})
	.merge('', protectedTweetRouter)
