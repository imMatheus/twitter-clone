import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@/types/User'

interface ProfileImageProps {
	user: User
}

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
	return (
		<Link href={`/users/${user.handle}`} passHref>
			<a className="cursor-pointer">
				<div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white">
					<Image layout="fill" src={user.profileImage} alt={`${user.name} profile image`} />
				</div>
			</a>
		</Link>
	)
}

export default ProfileImage
