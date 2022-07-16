import React, { useEffect, useRef, useState } from 'react'
import type { ChatRoomMessage } from '@/types/ChatRoom'
import Message from './Message'
import dateFormat from 'dateformat'
import { useIntersection } from '@mantine/hooks'
import { trpc } from '@/utils/trpc'
import Spinner from '@/components/Spinner'
interface MessagesFeedProps {
	roomId: string
}

const MessagesFeed: React.FC<MessagesFeedProps> = ({ roomId }) => {
	const dummyRef = useRef<HTMLDivElement>(null)
	const { data, isLoading } = trpc.useQuery(['messages.getMessages', { roomId: roomId, limit: 100 }])
	const messages = data?.messages
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current && messages) {
			dummyRef.current?.scrollIntoView()
			isFirstRender.current = false
		}
	}, [messages])

	if (!isLoading && !data)
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner />
			</div>
		)

	return (
		<div className="flex flex-col-reverse py-4">
			<div ref={dummyRef}></div>

			{messages?.map((message, index, arr) => {
				const previousMessage = arr[index - 1]
				const nextMessage = arr[index + 1]

				const isFirstInMessageBatch =
					nextMessage?.ownerId !== message.ownerId ||
					(nextMessage?.ownerId === message.ownerId &&
						dateFormat(nextMessage.createdAt, 'mmmm d, yyyy, h:MM TT') !==
							dateFormat(message.createdAt, 'mmmm d, yyyy, h:MM TT'))
				const isLastInMessageBatch =
					previousMessage?.ownerId !== message.ownerId ||
					(previousMessage?.ownerId === message.ownerId &&
						dateFormat(previousMessage.createdAt, 'mmmm d, yyyy, h:MM TT') !==
							dateFormat(message.createdAt, 'mmmm d, yyyy, h:MM TT'))
				return (
					<Message
						key={message.id}
						message={message}
						isFirstInMessageBatch={isFirstInMessageBatch}
						isLastInMessageBatch={isLastInMessageBatch}
					/>
				)
			})}
		</div>
	)
}

export default MessagesFeed
