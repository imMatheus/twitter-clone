import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'
import { transformDocument } from '@prisma/client/runtime'

export const messagesRouter = createProtectedRouter()
	.query('getRooms', {
		resolve: async ({ ctx, input }) => {
			const user = await prisma.user.findUnique({
				where: {
					id: ctx.session.userId
				},
				include: {
					chatRooms: {
						select: {
							id: true,
							members: {
								where: {
									id: {
										not: ctx.session.userId
									}
								},
								select: {
									name: true,
									handle: true,
									image: true
								}
							},
							messages: {
								select: {
									createdAt: true,
									text: true,
									owner: {
										select: {
											name: true,
											id: true
										}
									}
								},
								take: 1
							}
						},
						orderBy: {
							createdAt: 'desc'
						}
					}
				}
			})

			return {
				rooms: user!.chatRooms || null
			}
		}
	})
	.mutation('createOrJoinChatRoom', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session.userId
			if (userId === input.id) {
				return
			}

			const foundRoom = await prisma.chatRoom.findFirst({
				where: {
					members: {
						every: {
							id: {
								in: [userId, input.id]
							}
						}
					}
				},
				select: {
					id: true
				}
			})

			if (foundRoom)
				return {
					chatRoom: foundRoom
				}

			const chatRoom = await prisma.chatRoom.create({
				data: {
					members: {
						connect: [{ id: userId }, { id: input.id }]
					}
				},
				select: {
					id: true
				}
			})

			return {
				chatRoom
			}
		}
	})
	.query('getRoomById', {
		input: z.object({
			id: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session.userId

			const chatRoom = await prisma.chatRoom.findFirst({
				where: {
					id: input.id,
					members: {
						some: {
							id: userId
						}
					}
				},
				select: {
					id: true,
					members: {
						select: {
							id: true,
							handle: true,
							name: true,
							image: true,
							bio: true,
							followersCount: true,
							followingCount: true,
							createdAt: true
						}
					},
					messages: {
						include: {
							owner: {
								select: {
									id: true,
									name: true,
									image: true,
									handle: true
								}
							}
						}
					}
				}
			})

			return {
				chatRoom
			}
		}
	})

// await prisma.message.create({
// 	data: {
// 		text: 'secound ever message',
// 		chatRoomId: 'cl513rq261855zzhjav6wcoox',
// 		ownerId: 'cl4zulmxx0359r0hjomo3xsp5'
// 	}
// })
