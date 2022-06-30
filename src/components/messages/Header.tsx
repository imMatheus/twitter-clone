import React from 'react'
import { inferQueryResponse } from '@/utils/inferQueryResponse'
import NavContainer from '@/components/container/nav'
import Link from 'next/link'
import Image from 'next/image'
import type { ChatRoomMember } from '@/types/ChatRoom'
import ProfileImage from '@/components/ProfileImage'

interface HeaderProps {
	member: ChatRoomMember
}

const Header: React.FC<HeaderProps> = ({ member }) => {
	return (
		<NavContainer>
			<div className="flex flex-1 items-center gap-3">
				<ProfileImage user={member} size="5" />

				<div>
					<h3 className="text-lg font-bold leading-none">{member.name}</h3>
					<p className="text-sm text-text-grayed">@{member.handle}</p>
				</div>
			</div>
		</NavContainer>
	)
}

export default Header
