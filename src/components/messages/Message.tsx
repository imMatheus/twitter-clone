import React from 'react'
import type { ChatRoomMessage } from '@/types/ChatRoom'
import ProfileImage from '@/components/ProfileImage'
import classNames from 'classnames'
import { getDateSinceMessages } from '@/utils/getDateSinceMessages'
import { useSession } from 'next-auth/react'

interface MessageProps {
	message: ChatRoomMessage
	isFirstInMessageBatch: boolean
	isLastInMessageBatch: boolean
}

const Message: React.FC<MessageProps> = ({ message, isFirstInMessageBatch, isLastInMessageBatch }) => {
	const { data: session, status } = useSession()
	const isReceived = session?.userId !== message.ownerId

	return (
		<div className={classNames('w-full', isLastInMessageBatch ? 'mb-3' : 'mb-1')}>
			<div className={classNames('flex items-end')}>
				{isReceived && (
					<div className="w-12">
						<ProfileImage user={message.owner} size="10" />
					</div>
				)}
				<div className={classNames('max-w-xs lg:max-w-sm xl:max-w-lg', { 'ml-auto': !isReceived })}>
					<div
						className={classNames(
							'rounded-2xl px-4 py-3',
							isReceived
								? ['rounded-bl-none bg-bg-grayed-dark', { 'rounded-tl-none': !isFirstInMessageBatch }]
								: [
										'ml-auto rounded-br-none bg-accent text-white',
										{ 'rounded-tr-none': !isFirstInMessageBatch }
								  ]
						)}
					>
						<pre className="min-w-0 whitespace-pre-wrap break-words font-inter">{message.text}</pre>
					</div>
				</div>
			</div>
			{isLastInMessageBatch && (
				<div className={classNames('flex', { 'justify-end': !isReceived })}>
					{isReceived && <div className="w-12"></div>}
					<p className="pt-1 text-xs text-text-grayed">{getDateSinceMessages(message.createdAt)}</p>
				</div>
			)}
		</div>
	)
}

export default Message
