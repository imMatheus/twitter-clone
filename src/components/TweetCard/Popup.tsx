import React from 'react'
import PopupRow from './PopupRow'
import { useClickOutside } from '@mantine/hooks'
import { UserPlus, User, Trash2, ExternalLink } from 'react-feather'
import { Tweet as ITweet } from '@/types/Tweet'
import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

interface PopupProps {
	toggle: React.Dispatch<React.SetStateAction<boolean>>
	tweet: ITweet
}

const Popup: React.FC<PopupProps> = ({ toggle, tweet }) => {
	const ref = useClickOutside(() => toggle(false))
	const deleteTweetMutation = trpc.useMutation('tweets.deleteById')
	const { data: session } = useSession()
	const { data: follows } = trpc.useQuery(['users.currentUserFollowsUser', { id: tweet.owner.id }])
	const currentlyFollows = follows?.follows
	const followMutation = trpc.useMutation('users.follow')
	const router = useRouter()

	const deleteHandler = () => {
		deleteTweetMutation.mutate({ id: tweet.id })
	}

	return (
		<ul
			role="menu"
			ref={ref}
			className="absolute top-0 right-0 z-50 w-max max-w-sm overflow-hidden rounded-md bg-bg"
		>
			<style jsx>{`
				ul {
					box-shadow: rgb(var(--text) / 20%) 0px 0px 15px, rgb(var(--text) / 15%) 0px 0px 3px 1px;
				}
			`}</style>
			{session && session.userId === tweet.owner.id ? (
				<li
					className="flex gap-3 p-4 text-danger transition-colors hover:bg-text/[0.03]"
					onClick={deleteHandler}
				>
					<Trash2 className="h-5 w-5" />
					<p className="font-normal">Delete Tweet</p>
				</li>
			) : (
				<>
					<PopupRow
						Icon={UserPlus}
						onClick={() => {
							followMutation.mutate(
								{ id: tweet.owner.id },
								{
									onSuccess() {}
								}
							)
						}}
					>
						{currentlyFollows ? 'Unfollow' : 'Follow'} @{tweet.owner.handle}
					</PopupRow>

					<PopupRow
						Icon={UserPlus}
						onClick={() => {
							followMutation.mutate(
								{ id: tweet.owner.id },
								{
									onSuccess() {}
								}
							)
						}}
					>
						{currentlyFollows ? 'Unfollow' : 'Follow'} @{tweet.owner.handle}
					</PopupRow>
				</>
			)}
			<PopupRow
				Icon={User}
				onClick={() => {
					router.push(`/users/${tweet.owner.handle}`)
				}}
			>
				Visit {tweet.owner.name}
			</PopupRow>
			<PopupRow
				Icon={ExternalLink}
				onClick={() => {
					router.push(`/users/${tweet.owner.handle}/tweets/${tweet.id}`)
				}}
			>
				Visit Tweet
			</PopupRow>
		</ul>
	)
}

export default Popup
