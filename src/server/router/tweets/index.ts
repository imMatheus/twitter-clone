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
					likes: {
						where: {
							userId: ctx.session.userId
						}
					}
				},
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
	.query('search', {
		input: z.object({
			text: z.string()
		}),
		resolve: async ({ input }) => {
			const maxResults = 10

			// Have to use queryRaw because "LIKE" is not supported in prisma yet
			// const ids = await prisma.$queryRaw<{ id: string }[]>`
			// SELECT id FROM Tweet
			// WHERE text LIKE '%e%'
			// LIMIT ${maxResults}
			// ;`

			// console.log('ids')
			// console.log(ids)

			// const tweets = await prisma.tweet.findMany({
			// 	where: { id: { in: ids.map((row) => row.id) } }
			// })

			const tweets = await prisma.tweet.findMany({
				where: {
					text: {
						search: input.text || 'tilte'
						// search: input.text
					}
				},
				include: {
					owner: true
				}
			})

			return {
				tweets
			}
		}
	})
	.merge('', protectedTweetRouter)
