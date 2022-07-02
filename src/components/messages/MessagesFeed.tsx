import React, { useEffect, useRef } from 'react'
import type { ChatRoomMessage } from '@/types/ChatRoom'
import Message from './Message'

interface MessagesFeedProps {
	messages: ChatRoomMessage[]
}

const MessagesFeed: React.FC<MessagesFeedProps> = ({ messages }) => {
	const dummyRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		dummyRef.current?.scrollIntoView()
	}, [])

	return (
		<div className="flex flex-col py-4">
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
			<div ref={dummyRef}></div>
		</div>
	)
}

export default MessagesFeed
