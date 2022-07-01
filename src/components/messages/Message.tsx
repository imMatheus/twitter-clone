import React from 'react'
import type { ChatRoomMessage } from '@/types/ChatRoom'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import ProfileImage from '@/components/ProfileImage'
import classNames from 'classnames'
import dateFormat from 'dateformat'

interface MessageProps {
	message: ChatRoomMessage
}

const Message: React.FC<MessageProps> = ({ message }) => {
	const { currentUser } = useAuth()
	const isReceived = currentUser?.id !== message.ownerId
	return (
		<div className={classNames('mb-2 w-full')}>
			<div className={classNames('flex items-end')}>
				{isReceived && (
					<div className="w-12">
						<ProfileImage user={message.owner} size="10" />
					</div>
				)}
				<div className={classNames({ 'ml-auto': !isReceived })}>
					<div
						className={classNames(
							'rounded-2xl px-4 py-3',
							{ 'rounded-bl-none bg-bg-grayed-dark': isReceived },
							{ 'ml-auto rounded-br-none bg-accent text-white': !isReceived }
						)}
					>
						<pre className="font-inter">{message.text}</pre>
					</div>
				</div>
			</div>
			<div className={classNames('flex', { 'justify-end': !isReceived })}>
				{isReceived && <div className="w-12"></div>}
				<p className="pt-1 text-xs text-text-grayed">{dateFormat(message.createdAt, 'mmm d, yyyy, h:MM TT')}</p>
			</div>
		</div>
	)
}

export default Message
