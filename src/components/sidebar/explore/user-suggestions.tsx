import { trpc } from '@/utils/trpc'
import React from 'react'
import SuggestionRow from './suggestion-row'
import Spinner from '@/components/Spinner'

interface UserSuggestionsProps {}

const UserSuggestions: React.FC<UserSuggestionsProps> = ({}) => {
	const { data: followSuggestion, isLoading } = trpc.useQuery(['users.followSuggestion'])

	if (followSuggestion?.users?.length === 0 && !isLoading) return null

	if (isLoading)
		return (
			<div className="flex justify-center">
				<Spinner />
			</div>
		)

	return (
		<div className="overflow-x-hidden rounded-2xl bg-bg-grayed">
			<h2 className="py-3 px-4 text-xl font-extrabold">You might like</h2>

			{followSuggestion?.users.map((user) => (
				<SuggestionRow user={user} key={user.id} />
			))}
		</div>
	)
}

export default UserSuggestions
