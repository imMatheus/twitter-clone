import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const usersRouter = createRouter().query('byId', {
	input: z.object({
		handle: z.string()
	}),
	resolve: async ({ ctx, input }) => {
		console.log('byId')
		console.log(input)

		const user = await prisma.user.findFirst({
			where: {
				handle: input.handle
			},
			include: {
				tweets: {
					include: { owner: true },
					orderBy: { createdAt: 'desc' }
				}
			}
		})

		console.log(user)

		return {
			user
		}
	}
})
