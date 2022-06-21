import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'

export const tweetRouter = createRouter()
	.query('hello', {
		input: z.object({
			name: z.string()
		}),
		resolve: ({ ctx }) => {
			console.log('hello from stash route')
			console.log(ctx)

			return {
				text: `Hello from stash`
			}
		}
	})
	.query('get', {
		resolve: ({ ctx }) => {
			const tweets = prisma.tweet.findMany({})
			console.log('tweets: ', tweets)

			return {
				tweets: tweets
			}
		}
	})
	.mutation('post', {
		input: z.object({
			text: z.string()
		}),
		resolve: ({ ctx, input }) => {
			console.log('hello from stash route')
			console.log(ctx)
			const tweetCreated = prisma.tweet.create({
				data: {
					text: input.text,
					ownerId: '23323'
				}
			})

			return {
				tweet: tweetCreated
			}
		}
	})
