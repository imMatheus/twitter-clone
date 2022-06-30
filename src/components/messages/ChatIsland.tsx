import React from 'react'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { unCastArray } from '@/utils/unCastArray'
import { inferQueryResponse } from '@/utils/inferQueryResponse'
import Header from './Header'
import DisplayMember from './DisplayMember'
import type { ChatRoom } from '@/types/ChatRoom'
import MessagesFeed from './MessagesFeed'
import ChatBox from './ChatBox'

interface ChatIslandProps {
	room: ChatRoom
}

const ChatIsland: React.FC<ChatIslandProps> = ({ room }) => {
	const router = useRouter()
	const member = room.members[0]
	if (!member) return <></>

	return (
		<div className="flex h-screen min-w-0 flex-col overflow-hidden">
			<Header member={member} />
			<div className="flex-1 overflow-y-scroll px-4">
				<DisplayMember member={member} />
				<MessagesFeed messages={room.messages} />
			</div>
			<ChatBox />
		</div>
	)
}

export default ChatIsland
