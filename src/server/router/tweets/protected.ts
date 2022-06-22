import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const protectedTweetRouter = createProtectedRouter().mutation('post', {
	input: z.object({
		text: z.string()
	}),
	resolve: async ({ ctx, input }) => {
		if (!ctx.session.userId) return

		// create the tweet
		const tweetCreated = await prisma.tweet.create({
			data: {
				text: input.text,
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
