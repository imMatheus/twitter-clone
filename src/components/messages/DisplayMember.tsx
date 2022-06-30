import { User } from '@/types/User'
import { inferQueryResponse } from '@/utils/inferQueryResponse'
import Link from 'next/link'
import React from 'react'
import { Calendar } from 'react-feather'
import dateFormat from 'dateformat'
import type { ChatRoomMember } from '@/types/ChatRoom'

interface DisplayMemberProps {
	member: ChatRoomMember
}

const DisplayMember: React.FC<DisplayMemberProps> = ({ member }) => {
	if (!member) return null
	return (
		<Link href={`/users/${member.handle}`} passHref>
			<a className="flex flex-col items-center gap-1 border-b border-b-border py-5 px-4 transition-colors hover:bg-bg-grayed">
				<div className="flex flex-wrap gap-1">
					<p className="font-bold">{member.name}</p>
					<p className="text-text-grayed">@{member.handle}</p>
				</div>
				{member.bio && <pre className="font-inter">{member.bio}</pre>}
				<div className="flex gap-6">
					<div className="text-sm text-text-grayed">
						<span className="mr-1 font-semibold text-text">{member.followingCount}</span>
						Following
					</div>
					<div className="text-sm text-text-grayed">
						<span className="mr-1 font-semibold text-text">{member.followersCount}</span>
						Followers
					</div>
				</div>
				<div className="flex items-center gap-1 capitalize text-text-grayed">
					<Calendar className="h-4 w-4" /> Joined {dateFormat(member.createdAt, 'mmmm yyyy')}
				</div>
			</a>
		</Link>
	)
}

export default DisplayMember
