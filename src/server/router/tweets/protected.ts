import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const protectedTweetRouter = createProtectedRouter()
	.mutation('post', {
		input: z.object({
			text: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			if (!ctx.session.userId) return

			// removes all dubble \n from the text, maxes the number of continues line breaks to 1
			const cleanedText = input.text
				.split(/\n/)
				.filter((n, i, arr) => n !== '' || (n === '' && arr[i + 1] && arr[i + 1] !== ''))
				.join('\r\n')

			// create the tweet
			const tweetCreated = await prisma.tweet.create({
				data: {
					text: cleanedText,
					ownerId: ctx.session.userId
				}
			})

			// increment number of tweets for user
			await prisma.user.update({
				where: { id: ctx.session.userId },
				data: {
					numberOfTweets: { increment: 1 }
				}
			})

			return {
				tweet: tweetCreated
			}
		}
	})
	.mutation('deleteById', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			if (!ctx.session.userId) return

			// create the tweet
			const tweetCreated = await prisma.tweet.deleteMany({
				where: {
					id: input.id,
					ownerId: ctx.session.userId
				}
			})

			// increment number of tweets for user
			await prisma.user.update({
				where: { id: ctx.session.userId },
				data: {
					numberOfTweets: { decrement: 1 }
				}
			})

			return {
				tweet: tweetCreated
			}
		}
	})
