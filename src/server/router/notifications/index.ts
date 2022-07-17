import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const notificationsRouter = createProtectedRouter()
	.query('getNotifications', {
		resolve: async ({ ctx }) => {
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id: ctx.session.userId
				},
				select: {
					handle: true
				}
			})

			return {
				g: 'hej'
			}
		}
	})
	.query('getMentions', {
		resolve: async ({ ctx }) => {
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
				take: 80,
				orderBy: {
					createdAt: 'desc'
				}
			})

			return {
				mentions
			}
		}
	})
	.query('getLikes', {
		resolve: async ({ ctx }) => {
			const likes = await prisma.like.findMany({
				where: {
					tweet: {
						ownerId: ctx.session.userId
					},
					userId: { not: ctx.session.userId }
				},
				select: {
					tweet: {
						select: {
							id: true,
							text: true,

							owner: {
								select: {
									handle: true
								}
							}
						}
					},
					user: {
						select: {
							id: true,
							name: true,
							image: true,
							handle: true
						}
					}
				},
				take: 80,
				orderBy: {
					createdAt: 'desc'
				}
			})

			return {
				likes
			}
		}
	})
	.query('getFollowRequests', {
		resolve: async ({ ctx }) => {
			const followRequests = await prisma.followRequest.findMany({
				where: {
					receiverId: ctx.session.userId
				},
				select: {
					sender: {
						select: {
							id: true,
							name: true,
							image: true,
							handle: true,
							bio: true
						}
					}
				},
				take: 80,
				orderBy: {
					createdAt: 'desc'
				}
			})

			return {
				followRequests
			}
		}
	})
	.mutation('acceptFollowRequest', {
		input: z.object({
			senderId: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session.userId

			const deletedRequest = await prisma.followRequest.delete({
				where: {
					senderId_receiverId: {
						receiverId: userId,
						senderId: input.senderId
					}
				}
			})

			if (deletedRequest) {
				// create following connection
				await prisma.follows.create({
					data: {
						followerId: input.senderId,
						followingId: userId
					}
				})

				// update number of following
				await prisma.user.update({
					where: { id: input.senderId },
					data: {
						followingCount: { increment: 1 }
					}
				})

				// update number of followers
				await prisma.user.update({
					where: { id: userId },
					data: {
						followersCount: { increment: 1 }
					}
				})
			}
			return
		}
	})
