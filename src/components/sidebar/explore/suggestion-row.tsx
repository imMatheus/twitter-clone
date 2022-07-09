import ProfileImage from '@/components/ProfileImage'
import { inferQueryResponse } from '@/utils/inferQueryResponse'
import { trpc } from '@/utils/trpc'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/button'

interface SuggestionRowProps {
	user: inferQueryResponse<'users.followSuggestion'>['users'][number]
}

const SuggestionRow: React.FC<SuggestionRowProps> = ({ user }) => {
	const followMutation = trpc.useMutation('users.follow')
	const { data } = useSession()
	const [isFollowing, setIsFollowing] = useState(user.followers.length > 0)
	return (
		<article className="cursor-pointer transition-colors hover:bg-text/[0.03]">
			<Link href={`/users/${user.handle}`} passHref>
				<div className="flex items-center gap-3 px-4 py-3">
					<ProfileImage user={user} size="12" />

					<div className="w-full flex-1">
						<div className="flex items-center justify-between">
							<div className="flex flex-col">
								<Link href={`/users/${user.handle}`} passHref>
									<a className="cursor-pointer">
										<h2 className="mb-0.5 text-sm font-bold leading-4 hover:underline">
											{user.name}
										</h2>
									</a>
								</Link>
								<h3 className="text-sm text-text-grayed">@{user.handle}</h3>
							</div>
							{data?.userId !== user.id && (
								<Button
									variant={isFollowing ? 'light' : 'dark'}
									size="small"
									onClick={(e) => {
										e.stopPropagation()
										followMutation.mutate({
											id: user.id
										})
										setIsFollowing((c) => !c)
									}}
								>
									{isFollowing ? 'Unfollow' : 'Follow'}
								</Button>
							)}
						</div>
					</div>
				</div>
			</Link>
		</article>
	)
}

export default SuggestionRow
