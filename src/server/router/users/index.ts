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
						select: {
							id: true,
							text: true,
							numberOfLikes: true,
							numberOfReTweets: true,
							numberOfReplies: true,
							createdAt: true,
							owner: {
								select: {
									id: true,
									handle: true,
									image: true,
									name: true
								}
							},
							likes: {
								where: {
									userId: ctx.session?.userId
								}
							}
						},

						orderBy: { createdAt: 'desc' }
					}
				}
			})

			return {
				user
			}
		}
	})
	.merge('', protectedUserRouter)
