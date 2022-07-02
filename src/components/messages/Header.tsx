import React from 'react'
import NavContainer from '@/components/container/nav'
import type { ChatRoomMember } from '@/types/ChatRoom'
import ProfileImage from '@/components/ProfileImage'

interface HeaderProps {
	member: ChatRoomMember
}

const Header: React.FC<HeaderProps> = ({ member }) => {
	return (
		<div className="absolute left-0 right-0 top-0">
			<NavContainer>
				<div className="flex flex-1 items-center gap-3">
					<ProfileImage user={member} size="5" />

					<div>
						<h3 className="text-lg font-bold leading-none">{member.name}</h3>
						<p className="text-sm text-text-grayed">@{member.handle}</p>
					</div>
				</div>
			</NavContainer>
		</div>
	)
}

export default Header
