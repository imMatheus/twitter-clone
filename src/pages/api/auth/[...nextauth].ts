import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import EmailProvider from 'next-auth/providers/email'
import CredentialProvider from 'next-auth/providers/credentials'

const prisma = new PrismaClient()

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
			// profile(profile) {
			// 	console.log('proifle made it here')
			// 	console.log(profile)
			// 	return {
			// 		id: '', // will be set by prisma
			// 		handle: profile.name.split(' ').join('') || 'matheus1',
			// 		email: profile.email,
			// 		image: profile.avatar_url,
			// 		name: profile.name || profile.login
			// 	}
			// }
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD
				}
			},
			from: process.env.EMAIL_FROM
		})

		// CredentialProvider({
		// 	name: 'credentials',
		// 	credentials: {
		// 		username: {
		// 			label: 'Email',
		// 			type: 'text',
		// 			placeholder: 'johndoe@test.com'
		// 		},
		// 		password: { label: 'Password', type: 'password' }
		// 	},
		// 	authorize: async (credentials) => {
		// 		console.log(credentials)

		// 		// database look up
		// 		if (!credentials) return null
		// 		const userFromDb = await prisma.user.findUnique({
		// 			where: {
		// 				handle: credentials.username
		// 			}
		// 		})
		// 		console.log('got over here')
		// 		console.log(userFromDb)

		// 		if (userFromDb) {
		// 			return userFromDb
		// 		}

		// 		// login failed
		// 		return null
		// 	}
		// })
	],
	callbacks: {
		session: async ({ session, user }) => {
			session.userId = user.id as string
			// session.handle = user?.name?.split(' ').join('') + 'uggaaa' || 'matheus1'
			return Promise.resolve(session)
		}
	}
})
