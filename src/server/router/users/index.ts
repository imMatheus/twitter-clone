import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'
import { protectedUserRouter } from './protected'
import type {} from '@/server/utils/prisma'

async function getUserFromHandle(handle: string, currentUserId: string | undefined) {
	const user = await prisma.user.findFirstOrThrow({
		where: {
			handle: handle,
			OR: [
				{
					privacy: 'PUBLIC'
				},
				{
					followers: {
						some: {
							followerId: currentUserId
						}
					}
				}
			]
		},
		select: { id: true }
	})

	return user
}

export const usersRouter = createRouter()
	.query('byId', {
		input: z.object({
			handle: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const userHasAccess = await prisma.user.findFirst({
				where: {
					handle: input.handle,
					OR: [
						{
							privacy: 'PUBLIC'
						},
						{
							followers: {
								some: {
									followerId: ctx.session?.userId
								}
							}
						},
						{
							id: ctx.session?.userId
						}
					]
				},
				select: {
					id: true
				}
			})

			const user = await prisma.user.findFirst({
				where: {
					handle: input.handle
				},
				select: {
					id: true,
					image: true,
					name: true,
					handle: true,
					bio: true,
					privacy: true,
					location: true,
					website: true,
					followersCount: true,
					followingCount: true,
					createdAt: true,
					numberOfTweets: true
				}
			})

			return {
				user,
				hasAccess: !!userHasAccess
			}
		}
	})
	.query('getTweets', {
		input: z.object({
			handle: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const tweets = await prisma.tweet.findMany({
				where: {
					owner: {
						handle: input.handle,
						OR: [
							{
								privacy: 'PUBLIC'
							},
							{
								followers: {
									some: {
										followerId: ctx.session?.userId
									}
								}
							},
							{
								id: ctx.session?.userId
							}
						]
					},
					repliedToId: null
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
				},

				orderBy: { createdAt: 'desc' }
			})

			return {
				tweets
			}
		}
	})
	.query('getTweetsAndReplies', {
		input: z.object({
			handle: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const tweets = await prisma.tweet.findMany({
				where: {
					owner: {
						handle: input.handle,
						OR: [
							{
								privacy: 'PUBLIC'
							},
							{
								followers: {
									some: {
										followerId: ctx.session?.userId
									}
								}
							},
							{
								id: ctx.session?.userId
							}
						]
					}
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
				},

				orderBy: { createdAt: 'desc' }
			})

			return {
				tweets
			}
		}
	})
	.query('getLikedTweets', {
		input: z.object({
			handle: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			console.log('bgbgbg')

			const user = await getUserFromHandle(input.handle, ctx.session?.userId)

			console.log('lölölöl')

			const tweets = await prisma.like.findMany({
				where: {
					userId: user.id,
					tweet: {
						ownerId: {
							not: user.id
						}
					}
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
									userId: ctx.session?.userId
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
				tweets: tweets.map((tweet) => tweet.tweet)
			}
		}
	})
	.query('getFollowers', {
		input: z.object({
			handle: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const user = await prisma.user.findFirst({
				where: {
					handle: input.handle
				},
				select: {
					id: true,
					name: true,
					handle: true,
					followers: {
						select: {
							follower: {
								select: {
									id: true,
									name: true,
									handle: true,
									image: true,
									bio: true,
									followers: {
										where: {
											followerId: ctx.session?.userId
										}
									}
								}
							}
						}
					}
				}
			})

			return {
				user
			}
		}
	})
	.query('getFollowing', {
		input: z.object({
			handle: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const user = await prisma.user.findFirst({
				where: {
					handle: input.handle
				},
				select: {
					id: true,
					name: true,
					handle: true,
					following: {
						select: {
							following: {
								select: {
									id: true,
									name: true,
									handle: true,
									image: true,
									bio: true,
									followers: {
										where: {
											followerId: ctx.session?.userId
										}
									}
								}
							}
						}
					}
				}
			})

			return {
				user
			}
		}
	})
	.merge('', protectedUserRouter)
