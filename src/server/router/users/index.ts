import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'
import { protectedUserRouter } from './protected'

export const usersRouter = createRouter()
	.query('byId', {
		input: z.object({
			handle: z.string()
		}),
		resolve: async ({ ctx, input }) => {
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
	.merge('', protectedUserRouter)
