import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import EmailProvider from 'next-auth/providers/email'
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

export default NextAuth({
	adapter: PrismaAdapter(prisma),

	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			profile(profile) {
				return {
					id: profile.login, // will be set by prisma
					handle: profile.name.split(' ').join('') || 'matheus1',
					email: profile.email?.toLowerCase(),
					image: profile.avatar_url || 'http://',
					name: profile.name || profile.login || 'freeddeee'
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			profile(profile, tokens) {
				return {
					id: 'cl4os8dbw0020rhhjlh9nufgg', // will be set by prisma
					// id: profile.at_hash, // will be set by prisma
					handle: profile.email,
					email: profile.email?.toLowerCase(),
					image: profile.picture || 'http://',
					name: profile.given_name || profile.login || 'freeddeee'
				}
			}
		})
	],
	callbacks: {
		session: async ({ session, user }) => {
			session.userId = user.id as string
			// session.handle = user?.name?.split(' ').join('') + 'uggaaa' || 'matheus1'
			return Promise.resolve(session)
		},
		signIn: async (props) => {
			return true
			// if (account.provider === 'google') {
			// 	return profile.email_verified && profile.email.endsWith('@example.com')
			// }
			// return true // Do different verification for other providers that don't have `email_verified`
		}
	}
})
