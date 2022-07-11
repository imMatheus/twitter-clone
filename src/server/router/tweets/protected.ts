import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'
import { MAX_LENGTHS } from '@/constants'
import twttr from 'twitter-text'

export const protectedTweetRouter = createProtectedRouter()
	.mutation('post', {
		input: z.object({
			text: z.string(),
			tweetId: z.string().nullish()
		}),
		resolve: async ({ ctx, input }) => {
			// removes all dubble \n from the text, maxes the number of continues line breaks to 1
			const cleanedText = input.text
				.split(/\n/)
				.filter((n, i, arr) => n !== '' || (n === '' && arr[i + 1] && arr[i + 1] !== ''))
				.join('\r\n')

			if (cleanedText.length > MAX_LENGTHS.tweet) {
				return new Error('Text length to long')
			}

			// clears duplicates
			const mentions = [...new Set(twttr.extractMentions(input.text))]
			const hashtags = [...new Set(twttr.extractHashtags(input.text))]

			// create the tweet
			const tweetCreated = await prisma.tweet.create({
				data: {
					text: cleanedText,
					ownerId: ctx.session.userId,
					hashtags: {
						connectOrCreate: hashtags.map((hashtag) => ({
							create: {
								name: hashtag
							},
							where: {
								name: hashtag
							}
						}))
					},
					repliedToId: input.tweetId || null
				}
			})

			await prisma.hashtag.updateMany({
				where: {
					name: {
						in: hashtags
					}
				},
				data: {
					numberOfTweets: {
						increment: 1
					}
				}
			})

			if (mentions.length > 0) {
				await prisma.mentions.createMany({
					data: mentions.map((mentioned) => ({
						tweetId: tweetCreated.id,
						mentionedUserHandle: mentioned
					}))
					// skipDuplicates: true
				})
			}

			// increment number of tweets for user
			await prisma.user.update({
				where: { id: ctx.session.userId },
				data: {
					numberOfTweets: { increment: 1 }
				}
			})

			if (input.tweetId) {
				// increment number of replies for the tweet
				await prisma.tweet.update({
					where: { id: input.tweetId },
					data: {
						numberOfReplies: { increment: 1 }
					}
				})
			}

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
			const tweet = await prisma.tweet.findFirstOrThrow({
				where: {
					id: input.id,
					ownerId: ctx.session.userId
				},
				select: {
					repliedToId: true
				}
			})

			// delete the tweet
			const tweetCreated = await prisma.tweet.delete({
				where: {
					id: input.id
				}
			})

			// decrement number of tweets for user
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
