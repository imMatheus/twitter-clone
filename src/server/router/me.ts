import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '../utils/prisma'

export const meRouter = createProtectedRouter().query('me', {
	resolve: ({ ctx }) => {
		const session = ctx.session
		// if(!session.user) return null
		// const userFromDB = prisma.user.findFirst({where: { id: session.}})
		console.log('hello from stash route')

		console.log(session)

		return {
			text: `Hello from stash`
		}
	}
})
