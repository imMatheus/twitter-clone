import { User } from '@/types/User'
import Link from 'next/link'
import React from 'react'

interface DisplayUserProps {
	user: User
}

const DisplayUser: React.FC<DisplayUserProps> = ({ user }) => {
	if (!user) return null
	return (
		<Link href={`/users/${user.handle}`} passHref>
			<a className="flex flex-col items-center gap-1 transition-colors hover:bg-bg-grayed">
				<div>
					<p className="font-bold">{user.name}</p>
					<p className="text-text-grayed">@{user.handle}</p>
				</div>
				<p className="">{user.bio}</p>
			</a>
		</Link>
	)
}

export default DisplayUser
