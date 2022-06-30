import React from 'react'
import type { ChatRoomMessage } from '@/types/ChatRoom'
import Message from './Message'

interface MessagesFeedProps {
	messages: ChatRoomMessage[]
}

const MessagesFeed: React.FC<MessagesFeedProps> = ({ messages }) => {
	return (
		<div className="py-4">
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	)
}

export default MessagesFeed
