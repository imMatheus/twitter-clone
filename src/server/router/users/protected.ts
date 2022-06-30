import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const protectedUserRouter = createProtectedRouter()
	.mutation('follow', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			console.log('finna follow some people')
			console.log(ctx)

			const follows = await prisma.follows.findUnique({
				where: {
					followerId_followingId: {
						followerId: ctx.session.userId,
						followingId: input.id
					}
				}
			})
			if (follows) {
				const x = await prisma.follows.delete({
					where: {
						followerId_followingId: {
							followerId: ctx.session.userId,
							followingId: input.id
						}
					}
				})

				console.log('made it here 2222')
				console.log(x)

				// update number of following
				await prisma.user.update({
					where: { id: ctx.session.userId },
					data: {
						followingCount: { decrement: 1 }
					}
				})

				// update number of followers
				await prisma.user.update({
					where: { id: input.id },
					data: {
						followersCount: { decrement: 1 }
					}
				})
				return {
					success: true
				}
			}
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
	.query('currentUserFollowsUser', {
		input: z.object({
			id: z.string().nullable()
		}),
		resolve: async ({ ctx, input }) => {
			console.log('kkk')

			if (!input.id) return false
			const follows = await prisma.follows.findUnique({
				where: {
					followerId_followingId: {
						followerId: ctx.session.userId,
						followingId: input.id
					}
				}
			})

			console.log(follows)
			console.log(!!follows)

			return !!follows
		}
	})
	.query('followSuggestion', {
		resolve: async ({ ctx }) => {
			const users = await prisma.user.findMany({
				where: {
					id: {
						not: ctx.session.userId
					},
					privacy: 'PUBLIC',
					followers: {
						none: { followerId: ctx.session.userId }
					}
				},
				select: {
					id: true,
					name: true,
					handle: true,
					image: true,
					bio: true
				},
				orderBy: {
					followersCount: 'desc'
				},
				take: 3
			})
			return { users }
		}
	})
