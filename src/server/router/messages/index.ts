import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const messagesRouter = createProtectedRouter()
	.query('getRooms', {
		resolve: async ({ ctx, input }) => {
			console.log('byId')
			console.log(input)

			const user = await prisma.user.findUnique({
				where: {
					id: ctx.session.userId
				},
				include: {
					chatRooms: true
				}
			})

			console.log(user!.chatRooms)

			return {
				rooms: user!.chatRooms || null
			}
		}
	})
	.mutation('createRoom', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session.userId

			const chatRoom = await prisma.chatRoom.create({
				data: {
					members: {
						connect: [{ id: userId }, { id: input.id }]
					}
				}
			})

			return {
				chatRoom
			}
		}
	})
