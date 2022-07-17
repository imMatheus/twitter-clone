import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'
import { MAX_LENGTHS } from '@/constants'

export const protectedUserRouter = createProtectedRouter()
	.mutation('update', {
		input: z.object({
			handle: z
				.string()
				.min(2, { message: 'Handle needs to be between 2 and 30 characters' })
				.max(MAX_LENGTHS.handle)
				.trim(),
			name: z.string().max(MAX_LENGTHS.name),
			bio: z.string().max(MAX_LENGTHS.bio).nullable(),
			location: z.string().max(MAX_LENGTHS.location).nullable(),
			website: z.string().max(MAX_LENGTHS.website).nullable()
		}),
		resolve: async ({ ctx, input }) => {
			await prisma.user.update({
				where: {
					id: ctx.session.userId
				},
				data: {
					...input
				}
			})

			return {
				success: true
			}
		}
	})
	.mutation('updatePrivacy', {
		input: z.object({
			privacy: z.enum(['PRIVATE', 'PUBLIC'])
		}),
		resolve: async ({ ctx, input }) => {
			// accept all currently pending follow requests
			if (input.privacy === 'PUBLIC') {
				await prisma.followRequest.deleteMany({
					where: {
						receiverId: ctx.session.userId
					}
				})
			}

			await prisma.user.update({
				where: {
					id: ctx.session.userId
				},
				data: {
					...input
				}
			})

			return {
				success: true
			}
		}
	})
	.mutation('follow', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			if (ctx.session.userId === input.id) return

			const follows = await prisma.follows.findUnique({
				where: {
					followerId_followingId: {
						followerId: ctx.session.userId,
						followingId: input.id
					}
				}
			})

			if (follows) {
				await prisma.follows.delete({
					where: {
						followerId_followingId: {
							followerId: ctx.session.userId,
							followingId: input.id
						}
					}
				})

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
			const isPrivate = await prisma.user.findFirst({
				where: {
					id: input.id,
					privacy: 'PRIVATE'
				}
			})
			if (isPrivate) {
				console.log('gg')

				const alreadyHasRequest = await prisma.followRequest.findUnique({
					where: {
						senderId_receiverId: {
							receiverId: input.id,
							senderId: ctx.session.userId
						}
					}
				})

				if (alreadyHasRequest) {
					console.log('4444')

					await prisma.followRequest.delete({
						where: {
							senderId_receiverId: {
								receiverId: input.id,
								senderId: ctx.session.userId
							}
						}
					})
					return {
						success: true
					}
				}
				console.log('99999')

				await prisma.followRequest.create({
					data: {
						receiverId: input.id,
						senderId: ctx.session.userId
					}
				})
				return {
					success: true
				}
			}
			// create following connection
			await prisma.follows.create({
				data: {
					followerId: ctx.session.userId,
					followingId: input.id
				}
			})

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
			if (!input.id)
				return {
					follows: false,
					pendingRequest: false
				}
			const follows = await prisma.follows.findUnique({
				where: {
					followerId_followingId: {
						followerId: ctx.session.userId,
						followingId: input.id
					}
				}
			})

			const pendingRequest = await prisma.followRequest.findUnique({
				where: {
					senderId_receiverId: {
						senderId: ctx.session.userId,
						receiverId: input.id
					}
				}
			})

			return { follows, pendingRequest }
		}
	})
	.query('followSuggestion', {
		resolve: async ({ ctx }) => {
			const users = await prisma.user.findMany({
				where: {
					id: {
						not: ctx.session.userId
					},
					privacy: 'PUBLIC'
					// followers: {
					// 	none: { followerId: ctx.session.userId }
					// }
				},
				select: {
					id: true,
					name: true,
					handle: true,
					image: true,
					bio: true,
					followers: {
						where: {
							followerId: ctx.session.userId
						}
					}
				},
				orderBy: {
					followersCount: 'desc'
				},
				take: 4
			})
			return { users }
		}
	})
