import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'

export const trendsRouter = createRouter().query('getTopTrends', {
	resolve: async ({ ctx }) => {
		const trends = await prisma.hashtag.findMany({
			select: {
				id: true,
				name: true,
				numberOfTweets: true
			},
			orderBy: {
				numberOfTweets: 'desc'
			},
			take: 5
		})

		return {
			trends
		}
	}
})
