import React from 'react'
import ChatIsland from '@/components/messages/ChatIsland'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { unCastArray } from '@/utils/unCastArray'
import Spinner from '@/components/Spinner'

interface MessageProps {}

const Message: React.FC<MessageProps> = ({}) => {
	const router = useRouter()
	const { roomId } = router.query
	if (!roomId) return null
	const { data, isLoading } = trpc.useQuery(['messages.getRoomById', { id: unCastArray(roomId) }])

	const room = data?.chatRoom

	if (isLoading)
		return (
			<div className="flex h-screen min-w-0 items-center justify-center">
				<Spinner />
			</div>
		)

	if (!room || !room.members[0]) {
		router.replace('/messages')
		return <></>
	}

	return <ChatIsland room={room} />
}

export default Message
