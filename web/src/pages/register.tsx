import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useMutation } from '@/hooks/useMutation'

const Register: NextPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const mutation = useMutation()

	async function signUp(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const res = await mutation('/signup', { email, password, handle: 'madn40089978j', name: 'ma4' })
		console.log('signup res', res)
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={signUp}>
				<label htmlFor="email">email</label>
				<input
					type="email"
					id="email"
					placeholder="email..."
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">password</label>
				<input
					type="text"
					id="password"
					placeholder="password..."
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="bg-red-500 p-2">
					submit
				</button>
			</form>
		</div>
	)
}

export default Register
