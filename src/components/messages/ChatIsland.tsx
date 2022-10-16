import React from 'react'
import Header from './Header'
import DisplayMember from './DisplayMember'
import type { ChatRoom } from '@/types/ChatRoom'
import MessagesFeed from './MessagesFeed'
import ChatBox from './ChatBox'

interface ChatIslandProps {
	room: ChatRoom
}

const ChatIsland: React.FC<ChatIslandProps> = ({ room }) => {
	const member = room.members[1]
	if (!member) return <></>

	return (
		<div className="relative flex h-screen min-w-0 flex-col">
			<Header member={member} />
			<div className="flex-1 overflow-y-scroll px-4 pt-14">
				<DisplayMember member={member} />
				<MessagesFeed roomId={room.id} />
			</div>
			<ChatBox room={room} />
		</div>
	)
}

export default ChatIsland
