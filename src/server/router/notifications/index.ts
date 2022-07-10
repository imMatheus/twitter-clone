import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const notificationsRouter = createProtectedRouter().query('getMentions', {
	resolve: async ({ ctx, input }) => {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				id: ctx.session.userId
			},
			select: {
				handle: true
			}
		})

		const mentions = await prisma.mentions.findMany({
			where: {
				mentionedUserHandle: user.handle
			},
			select: {
				tweet: {
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
						repliedTo: {
							select: {
								id: true,
								owner: {
									select: {
										name: true,
										handle: true
									}
								}
							}
						},
						likes: {
							where: {
								userId: ctx.session.userId
							}
						}
					}
				}
			},

			orderBy: {
				createdAt: 'desc'
			}
		})

		return {
			mentions
		}
	}
})
