import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			profile(profile) {
				console.log('proifle made it here')
				console.log(profile)

				return {
					id: 'ssss',
					handle: profile.name + 'handle' || 'matheus1',
					email: profile.email,
					image: profile.avatar_url,
					name: profile.name || profile.login
				}
			}
		})
	],
	callbacks: {
		session: async ({ session, user }) => {
			session.userId = user.id as string
			return Promise.resolve(session)
		}
	}
})
