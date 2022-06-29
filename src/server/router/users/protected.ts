import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const protectedUserRouter = createProtectedRouter().mutation('follow', {
	input: z.object({
		id: z.string()
	}),
	resolve: async ({ ctx, input }) => {
		console.log('finna follow some people')
		console.log(ctx)

		// create following connection
		const x = await prisma.follows.create({
			data: {
				followerId: ctx.session.userId,
				followingId: input.id
			}
		})

		console.log('made it here 555')
		console.log(x)

		// update number of following
		await prisma.user.update({
			where: { id: ctx.session.userId },
			data: {
				followingCount: { increment: 1 }
			}
		})

		// update number of followers
		await prisma.user.update({
			where: { id: input.id },
			data: {
				followersCount: { increment: 1 }
			}
		})

		return {
			success: true
		}
	}
})
