import React, { useId, useState } from 'react'
import Header from './Header'
import { useAuth } from '@/context/AuthContext'
import CheckBox from '@/components/checkBox'
import { trpc } from '@/utils/trpc'

const Account: React.FC = ({}) => {
	const privacyMutation = trpc.useMutation(['users.updatePrivacy'])

	const utils = trpc.useContext()

	return (
		<div className="border-b border-b-border p-4">
			<Header text="Account" />
			<div className="flex items-center">
				<div>
					<h3 className="text-base font-bold">Private account</h3>
					<p className="text-sm text-text-grayed">
						When selected, your Tweets and other account information are only visible to people who follow
						you.
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
		</div>
	)
}

export default Account
