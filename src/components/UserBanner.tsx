import React from 'react'
import { ArrowLeft, MoreHorizontal } from 'react-feather'
import Link from 'next/link'
import Image from 'next/image'
import UserBannerImage from '@/../public/user-banner-white.svg'
import type { inferQueryResponse } from '@/utils/inferQueryResponse'

interface UserBannerProps {
	user: inferQueryResponse<'users.byId'>['user']
}

const UserBanner: React.FC<UserBannerProps> = ({ user }) => {
	console.log(user)

	if (!user) return null

	return (
		<div>
			<div className="relative h-52">
				<Image src={UserBannerImage} alt="User profile banner" layout="fill" objectFit="cover" />
			</div>
			<div className="border-b border-b-border p-4">
				<div className="flex items-start justify-between">
					<div className="h-[5.5rem]">
						<div className="relative h-[11rem] w-[11rem] -translate-y-1/2 overflow-hidden rounded-full border-4 border-bg bg-white">
							<Image layout="fill" src={user.image} alt={`${user.name} profile image`} />
						</div>
					</div>
					<div className="flex gap-2">
						<button className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg">
							<MoreHorizontal className="h-5 w-5 text-text" />
						</button>
						<button className="h-9 rounded-full bg-text px-4 font-bold text-bg">Följ</button>
					</div>
				</div>
				<div className="px-1">
					<h1 className="text-xl font-extrabold">{user.name}</h1>
					<p className="font-normal text-text-grayed">@{user.handle}</p>
					<div className="my-2 flex gap-4 text-sm">
						<div className="flex gap-1">
							<span className="font-bold">43</span> <span className="text-text-grayed">follows</span>
						</div>
						<div className="flex gap-1">
							<span className="font-bold">812</span> <span className="text-text-grayed">followers</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserBanner
