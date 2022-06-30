import React from 'react'
import type { ChatRoomMessage } from '@/types/ChatRoom'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import ProfileImage from '@/components/ProfileImage'

interface MessageProps {
	message: ChatRoomMessage
}

const Message: React.FC<MessageProps> = ({ message }) => {
	const { currentUser } = useAuth()
	const isReceived = currentUser?.id === message.ownerId
	return <div className="flex w-full bg-red-200">{isReceived && <ProfileImage user={message.owner} size="10" />}</div>
}

export default Message
