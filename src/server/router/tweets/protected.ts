import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const protectedTweetRouter = createProtectedRouter()
	.mutation('post', {
		input: z.object({
			text: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			// removes all dubble \n from the text, maxes the number of continues line breaks to 1
			const cleanedText = input.text
				.split(/\n/)
				.filter((n, i, arr) => n !== '' || (n === '' && arr[i + 1] && arr[i + 1] !== ''))
				.join('\r\n')

			if (cleanedText.length > 191) {
				return new Error('Text length to long')
			}

			// create the tweet
			const tweetCreated = await prisma.tweet.create({
				data: {
					text: cleanedText,
					ownerId: ctx.session.userId
				}
			})

			// increment number of tweets for user
			await prisma.user.update({
				where: { id: ctx.session.userId },
				data: {
					numberOfTweets: { increment: 1 }
				}
			})

			return {
				tweet: tweetCreated
			}
		}
	})
	.mutation('deleteById', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			// create the tweet
			const tweetCreated = await prisma.tweet.deleteMany({
				where: {
					id: input.id,
					ownerId: ctx.session.userId
				}
			})

			// increment number of tweets for user
			await prisma.user.update({
				where: { id: ctx.session.userId },
				data: {
					numberOfTweets: { decrement: 1 }
				}
			})

			return {
				tweet: tweetCreated
			}
		}
	})
	.mutation('like', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const likesTweet = await prisma.like.findUnique({
				where: {
					tweetId_userId: {
						tweetId: input.id,
						userId: ctx.session.userId
					}
				}
			})

			// like the tweet
			if (likesTweet) {
				await prisma.like.delete({
					where: {
						tweetId_userId: {
							tweetId: input.id,
							userId: ctx.session.userId
						}
					}
				})
			} else {
				await prisma.like.create({
					data: {
						tweetId: input.id,
						userId: ctx.session.userId
					}
				})
			}

			// increment number of likes on tweet
			await prisma.tweet.update({
				where: { id: input.id },
				data: {
					numberOfLikes: { increment: likesTweet ? -1 : 1 }
				}
			})

			return {
				success: true
			}
		}
	})
