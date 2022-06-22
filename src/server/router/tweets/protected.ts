import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const protectedTweetRouter = createProtectedRouter().mutation('post', {
	input: z.object({
		text: z.string()
	}),
	resolve: async ({ ctx, input }) => {
		console.log('hello from private tweet route mutation')
		console.log(ctx)
		if (!ctx.session.userId) return
		const tweetCreated = await prisma.tweet.create({
			data: {
				text: input.text,
				ownerId: ctx.session.userId
			}
		})

		console.log(tweetCreated)

		return {
			tweet: tweetCreated
		}
	}
})
