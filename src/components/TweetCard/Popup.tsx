import React from 'react'
import PopupRow from './PopupRow'
import { useClickOutside } from '@mantine/hooks'
import { Frown, UserPlus, UserX, List, Trash2 } from 'react-feather'
import { Tweet as ITweet } from '@/types/Tweet'
import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'

interface PopupProps {
	toggle: React.Dispatch<React.SetStateAction<boolean>>
	tweet: ITweet
}

const Popup: React.FC<PopupProps> = ({ toggle, tweet }) => {
	const ref = useClickOutside(() => toggle(false))
	const deleteTweetMutation = trpc.useMutation('tweets.deleteById')
	const { data: session } = useSession()

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
			{session && session.userId === tweet.owner.id && (
				<li
					className="flex gap-3 p-4 text-danger transition-colors hover:bg-text/[0.03]"
					onClick={deleteHandler}
				>
					<Trash2 className="h-5 w-5" />
					<p className="font-normal">Delete Tweet</p>
				</li>
			)}
			<PopupRow Icon={Frown}>Not interested in this Tweet</PopupRow>
			<PopupRow Icon={UserPlus}>Follow@kylegawley</PopupRow>
			<PopupRow Icon={List}>Add/remove @kylegawley from Lists</PopupRow>
			<PopupRow Icon={UserPlus}>Mute @kylegawley</PopupRow>
			<PopupRow Icon={UserPlus}>Block @kylegawley</PopupRow>
		</ul>
	)
}

export default Popup
