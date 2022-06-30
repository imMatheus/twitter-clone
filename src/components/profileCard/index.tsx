import React from 'react'
import type { inferQueryResponse } from '@/utils/inferQueryResponse'
import Link from 'next/link'
import ProfileImage from '../ProfileImage'
import Button from '@/components/button'
import { trpc } from '@/utils/trpc'

interface ProfileCardProps {
	user: inferQueryResponse<'users.followSuggestion'>['users'][number]
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
	const followMutation = trpc.useMutation('users.follow')
	return (
		<article className="cursor-pointer transition-colors hover:bg-text/[0.03]">
			<Link href={`/users/${user.handle}`} passHref>
				<div className="flex items-start gap-3 p-4">
					<ProfileImage user={user} />

					<div className="w-full flex-1">
						<div className="flex justify-between">
							<div className="flex flex-col">
								<Link href={`/users/${user.handle}`} passHref>
									<a className="cursor-pointer">
										<h2 className="font-bold leading-4">{user.name}</h2>
									</a>
								</Link>
								<h3 className="text-sm text-text-grayed">@{user.handle}</h3>
							</div>
							<Button
								variant="dark"
								onClick={(e) => {
									e.stopPropagation()
									followMutation.mutate({
										id: user.id
									})
								}}
							>
								Follow
							</Button>
						</div>
						<pre className="font-inter">{user.bio}</pre>
					</div>
				</div>
			</Link>
		</article>
	)
}

export default ProfileCard
