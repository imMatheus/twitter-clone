import React from 'react'
import ColorPicker from './ColorPicker'
import ThemeButtonWrapper from './ThemeButtonWrapper'
import { signIn, signOut, useSession } from 'next-auth/react'

const Settings: React.FC = () => {
	const { data } = useSession()
	return (
		<div>
			<div className="border-b border-b-border p-4">
				<h2 className="mb-3 text-2xl font-bold">Accent color</h2>
				<div className="flex flex-wrap justify-between gap-4">
					<ColorPicker color="29 155 240" />
					<ColorPicker color="255 212 0" />
					<ColorPicker color="249 25 128" />
					<ColorPicker color="120 85 255" />
					<ColorPicker color="254 122 0" />
					<ColorPicker color="10 186 124" />
				</div>
				{data ? (
					<button onClick={() => signOut()} className="bg-red-500 p-2">
						Sign out
					</button>
				) : (
					<button onClick={() => signIn()} className="bg-blue-500 p-2">
						Sign in
					</button>
				)}
			</div>
			<ThemeButtonWrapper />
		</div>
	)
}

export default Settings
