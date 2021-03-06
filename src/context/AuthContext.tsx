import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import type { User } from '@/types/User'

function login() {
	signIn('github')
}

function logout() {
	signOut()
}

interface Context {
	currentUser: User | null
	fetchingUser: boolean
	logout: () => void
	login: () => void
}

const AuthContext = createContext<Context>({
	currentUser: null,
	fetchingUser: false,
	logout,
	login
})

export function useAuth() {
	return useContext(AuthContext)
}

type ProviderProps = {
	children: ReactNode
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
	const { data, isLoading: fetchingUser } = trpc.useQuery(['me'])
	const currentUser = data?.user || null

	const value = {
		currentUser,
		fetchingUser,
		logout,
		login
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
