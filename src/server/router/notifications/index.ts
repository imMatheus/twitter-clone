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
