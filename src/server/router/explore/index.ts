import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'

export const exploreRouter = createRouter()
	.query('search', {
		input: z.object({
			text: z.string()
		}),
		resolve: async ({ input, ctx }) => {
			if (input.text === '') return
			const tweets = await prisma.tweet.findMany({
				where: {
					OR: [
						{
							owner: {
								followers: {
									some: {
										followerId: ctx?.session?.userId
									}
								}
							}
						},
						{
							owner: {
								privacy: 'PUBLIC'
							}
						}
					],
					text: {
						contains: input.text
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
							userId: ctx?.session?.userId
						}
					}
				},
				orderBy: {
					numberOfLikes: 'desc'
				}
			})

			return {
				tweets
			}
		}
	})
	.query('searchHashtags', {
		input: z.object({
			text: z.string()
		}),
		resolve: async ({ input, ctx }) => {
			if (input.text === '') return
			const tweets = await prisma.tweet.findMany({
				where: {
					OR: [
						{
							owner: {
								followers: {
									some: {
										followerId: ctx?.session?.userId
									}
								}
							}
						},
						{
							owner: {
								privacy: 'PUBLIC'
							}
						}
					],
					hashtags: {
						some: {
							name: input.text[0] === '#' ? input.text.slice(1) : input.text
						}
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
							userId: ctx?.session?.userId
						}
					}
				},
				orderBy: {
					numberOfLikes: 'desc'
				}
			})

			return {
				tweets
			}
		}
	})
	.query('searchUsers', {
		input: z.object({
			text: z.string()
		}),
		resolve: async ({ input, ctx }) => {
			if (input.text === '') return
			const users = await prisma.user.findMany({
				where: {
					AND: [
						{
							OR: [
								{
									followers: {
										some: {
											followerId: ctx?.session?.userId
										}
									}
								},
								{
									privacy: 'PUBLIC'
								}
							]
						},
						{
							OR: [
								{
									handle: {
										contains: input.text
									}
								},
								{
									name: {
										contains: input.text
									}
								}
							]
						}
					]
				},
				select: {
					id: true,
					name: true,
					handle: true,
					image: true,
					bio: true,
					followers: {
						where: {
							followerId: ctx?.session?.userId
						}
					}
				},
				orderBy: {
					followersCount: 'desc'
				},
				take: 4
			})

			return {
				users
			}
		}
	})
