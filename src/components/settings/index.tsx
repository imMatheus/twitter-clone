import React from 'react'
import ColorPicker from './ColorPicker'
import ThemeButtonWrapper from './ThemeButtonWrapper'
import { signIn, signOut, useSession } from 'next-auth/react'
import Header from './Header'
import Account from './Account'
import Accent from './Accent'

const Settings: React.FC = () => {
	const { data } = useSession()
	return (
		<div>
			{/* {data ? (
					<button onClick={() => signOut()} className="bg-red-500 p-2">
						Sign out
					</button>
				) : (
					<button onClick={() => signIn()} className="bg-blue-500 p-2">
						Sign in
					</button>
				)} */}
			<Accent />
			<ThemeButtonWrapper />
			<Account />
		</div>
	)
}

export default Settings
