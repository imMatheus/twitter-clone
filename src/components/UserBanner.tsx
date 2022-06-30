import React, { useState } from 'react'
import { MoreHorizontal, Mail, MapPin, Link as LinkIcon, Calendar } from 'react-feather'
import Link from 'next/link'
import Image from 'next/image'
import UserBannerImage from '@/../public/user-banner-white.svg'
import type { inferQueryResponse } from '@/utils/inferQueryResponse'
import dateFormat from 'dateformat'
import { useAuth } from '@/context/AuthContext'
import { trpc } from '@/utils/trpc'
import Button from '@/components/button'
import { useRouter } from 'next/router'

interface UserBannerProps {
	user: inferQueryResponse<'users.byId'>['user']
}

const UserBanner: React.FC<UserBannerProps> = ({ user }) => {
	const { currentUser } = useAuth()
	const utils = trpc.useContext()
	const followMutation = trpc.useMutation('users.follow')
	const getChatRoomMutation = trpc.useMutation(['messages.createOrJoinChatRoom'])
	const { data: follows } = trpc.useQuery(['users.currentUserFollowsUser', { id: user?.id || null }])
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	// In component:

	if (!user) return null
	const isOwnPage = user.id === currentUser?.id

	const handleFollowMutation = () => {
		setLoading(true)
		followMutation.mutate(
			{ id: user.id },
			{
				onSuccess() {
					utils.invalidateQueries(['users.byId'])
					utils.invalidateQueries(['users.currentUserFollowsUser'])
					setLoading(false)
				}
			}
		)
	}

	const handleJoinChatRoomMutation = async () => {
		getChatRoomMutation.mutate(
			{
				id: user.id
			},
			{
				onSuccess(response) {
					if (response) {
						router.push(`/messages/${response.chatRoom.id}`)
					}
				}
			}
		)
	}

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
						<button className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg transition-colors hover:bg-bg-grayed-dark">
							<MoreHorizontal className="h-5 w-5 text-text" />
						</button>

						{!isOwnPage && currentUser && (
							<>
								<button
									onClick={handleJoinChatRoomMutation}
									className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg transition-colors hover:bg-bg-grayed-dark"
								>
									<Mail className="h-5 w-5 text-text" />
								</button>
								{follows ? (
									<Button variant="light" onClick={handleFollowMutation} loading={loading}>
										Unfollow
									</Button>
								) : (
									<Button variant="dark" onClick={handleFollowMutation} loading={loading}>
										Följ
									</Button>
								)}
							</>
						)}
					</div>
				</div>
				<div className="px-1">
					<h1 className="text-xl font-extrabold">{user.name}</h1>
					<p className="text-sm font-normal text-text-grayed">@{user.handle}</p>
					<pre className="font-inter">{user.bio}</pre>
					<div className="flex flex-wrap items-center gap-4 py-2 text-sm text-text-grayed">
						<div className="flex items-center gap-1">
							<MapPin className="h-4 w-4" /> Seattle, WA
						</div>
						<div className="flex items-center gap-1">
							<LinkIcon className="h-4 w-4" /> Seattle, WA
						</div>
						<div className="flex items-center gap-1 capitalize">
							<Calendar className="h-4 w-4" /> Joined {dateFormat(user.createdAt, 'mmmm yyyy')}
						</div>
					</div>
					<div className="my-2 flex gap-4 text-sm">
						<div className="flex gap-1">
							<span className="font-bold">{user.followingCount}</span>
							<span className="text-text-grayed">follows</span>
						</div>
						<div className="flex gap-1">
							<span className="font-bold">{user.followersCount}</span>
							<span className="text-text-grayed">followers</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserBanner
