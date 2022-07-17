import React, { useState } from 'react'
import { Mail, MapPin, Link as LinkIcon, Calendar, Lock } from 'react-feather'
import Link from 'next/link'
import Image from 'next/image'
import UserBannerImage from '@/../public/user-banner-white.svg'
import type { inferQueryResponse } from '@/utils/inferQueryResponse'
import dateFormat from 'dateformat'
import { useAuth } from '@/context/AuthContext'
import { trpc } from '@/utils/trpc'
import Button from '@/components/button'
import { useRouter } from 'next/router'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'
import { useModal } from '@/context/ModalContext'

interface UserBannerProps {
	user: inferQueryResponse<'users.byId'>['user']
	hasAccess: boolean
}

const UserBanner: React.FC<UserBannerProps> = ({ user, hasAccess }) => {
	const { currentUser } = useAuth()
	const { setShowModal } = useModal()
	const utils = trpc.useContext()
	const followMutation = trpc.useMutation('users.follow')
	const getChatRoomMutation = trpc.useMutation(['messages.createOrJoinChatRoom'])
	const { data } = trpc.useQuery(['users.currentUserFollowsUser', { id: user?.id || null }])
	const follows = data?.follows
	const pendingRequest = data?.pendingRequest
	const [loading, setLoading] = useState(false)
	const router = useRouter()

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
			<div className="p-4">
				<div className="flex items-start justify-between">
					<div className="h-[5.5rem]">
						<div className="w-30 h-30 relative -translate-y-1/2 overflow-hidden rounded-full border-4 border-bg bg-white sm:h-36 sm:w-36 lg:h-44 lg:w-44">
							<Image layout="fill" src={user.image} alt={`${user.name} profile image`} />
						</div>
					</div>
					<div className="flex gap-2">
						{isOwnPage && currentUser ? (
							<Button
								variant="light"
								onClick={() => {
									setShowModal(true)
								}}
							>
								Edit profile
							</Button>
						) : (
							<>
								{hasAccess && (
									<button
										onClick={handleJoinChatRoomMutation}
										className="flex h-9 w-9 items-center justify-center rounded-full border bg-bg transition-colors hover:bg-bg-grayed-dark"
									>
										<Mail className="h-5 w-5 text-text" />
									</button>
								)}
								{follows ? (
									<Button variant="light" onClick={handleFollowMutation} loading={loading}>
										Unfollow
									</Button>
								) : pendingRequest ? (
									<Button variant="light" onClick={handleFollowMutation} loading={loading}>
										Pending
									</Button>
								) : (
									<Button variant="dark" onClick={handleFollowMutation} loading={loading}>
										Follow
									</Button>
								)}
							</>
						)}
					</div>
				</div>
				<div className="px-1">
					<h1 className="flex items-center text-xl font-extrabold">
						{user.name}{' '}
						{user.privacy === 'PRIVATE' && <Lock className="ml-1 inline h-4 w-4" strokeWidth={2.4} />}
					</h1>
					<p className="text-sm font-normal text-text-grayed">@{user.handle}</p>
					{user.bio && <pre className="font-inter">{user.bio}</pre>}
					<div className="flex flex-wrap items-center gap-4 py-2 text-sm text-text-grayed">
						{user.location && (
							<div className="flex items-center gap-1">
								<MapPin className="h-4 w-4" /> {user.location}
							</div>
						)}
						{user.website && (
							<div className="flex items-center gap-1">
								<LinkIcon className="h-4 w-4" />{' '}
								<a
									href={user.website}
									target="_blank"
									rel="noreferrer"
									className="text-accent hover:underline"
								>
									{new URL(user.website).hostname}
								</a>
							</div>
						)}
						<div className="flex items-center gap-1 capitalize">
							<Calendar className="h-4 w-4" /> Joined {dateFormat(user.createdAt, 'mmmm yyyy')}
						</div>
					</div>
					<div className="my-2 flex gap-4 text-sm">
						{hasAccess ? (
							<>
								<Link href={`/users/${user.handle}/following`} passHref>
									<a className="min-w-0 hover:underline">
										<span className="font-bold">{user.followingCount}</span>{' '}
										<span className="text-text-grayed">Following</span>
									</a>
								</Link>
								<Link href={`/users/${user.handle}/followers`} passHref>
									<a className="min-w-0 hover:underline">
										<span className="font-bold">{user.followersCount}</span>{' '}
										<span className="text-text-grayed">Followers</span>
									</a>
								</Link>
							</>
						) : (
							<>
								<span className="min-w-0">
									<span className="font-bold">{user.followingCount}</span>{' '}
									<span className="text-text-grayed">Following</span>
								</span>
								<span className="min-w-0">
									<span className="font-bold">{user.followersCount}</span>{' '}
									<span className="text-text-grayed">Followers</span>
								</span>
							</>
						)}
					</div>
				</div>
			</div>
			{hasAccess && (
				<SectionPicker>
					<Option href={`/users/${user.handle}`} text="Tweets" />
					<Option href={`/users/${user.handle}/with_replies`} text="Tweets & replies" />
					<Option href={`/users/${user.handle}/likes`} text="Likes" />
				</SectionPicker>
			)}
		</div>
	)
}

export default UserBanner
