import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'
import { protectedTweetRouter } from './protected'

export const tweetRouter = createRouter()
	.query('feed', {
		resolve: async ({ ctx }) => {
			if (!ctx.session?.userId)
				return {
					tweets: []
				}

			const tweets = await prisma.tweet.findMany({
				where: {
					OR: [
						{
							owner: {
								followers: {
									some: {
										followerId: ctx.session.userId
									}
								}
							}
						},
						{
							ownerId: ctx.session.userId
						}
					]
				},
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
				},
				take: 30,
				orderBy: {
					createdAt: 'desc'
				}
			})

			return {
				tweets
			}
		}
	})
	.query('byId', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const tweet = await prisma.tweet.findUnique({
				where: {
					id: input.id
				},
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
							userId: ctx.session?.userId
						}
					}
				}
			})

			return {
				tweet
			}
		}
	})
	.query('getRepliesById', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const replies = await prisma.tweet.findMany({
				where: {
					repliedToId: input.id
				},
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
				}
			})

			return {
				replies
			}
		}
	})

	.merge('', protectedTweetRouter)
