import React, { useId, useState } from 'react'
import Header from './Header'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useAuth } from '@/context/AuthContext'
import CheckBox from '@/components/checkBox'
import { trpc } from '@/utils/trpc'
import Button from '@/components/button'

const Account: React.FC = ({}) => {
	const { data } = useSession()
	const privacyMutation = trpc.useMutation(['users.updatePrivacy'])
	const utils = trpc.useContext()

	return (
		<div className="border-b border-b-border p-4">
			<Header text="Account" />
			{data && (
				<div className="flex items-center">
					<div>
						<h3 className="text-base font-bold">Private account</h3>
						<p className="text-sm text-text-grayed">
							When selected, your Tweets and other account information are only visible to people who
							follow you.
						</p>
					</div>
					<CheckBox
						onClick={(checked) => {
							privacyMutation.mutate(
								{
									privacy: checked ? 'PRIVATE' : 'PUBLIC'
								},
								{
									onSuccess() {
										utils.invalidateQueries(['me'])
									}
								}
							)
						}}
					/>
				</div>
			)}
			<div className="mt-4">
				{data ? (
					<Button onClick={() => signOut()} variant="dark" size="large">
						Sign out
					</Button>
				) : (
					<Button onClick={() => signIn()} variant="dark" size="large">
						Sign in
					</Button>
				)}
			</div>
		</div>
	)
}

export default Account
