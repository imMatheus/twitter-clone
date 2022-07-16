import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Spinner from '@/components/Spinner'
import HeaderBox from '@/components/HeaderBox'
import { trpc } from '@/utils/trpc'
import { unCastArray } from '@/utils/unCastArray'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'
import TweetCard from '@/components/TweetCard'
import NotFound from '@/components/error/notFound'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { Heart } from 'react-feather'
import ProfileImage from '@/components/ProfileImage'

const Likes: NextPage = () => {
	const { currentUser } = useAuth()

	const { data, isLoading } = trpc.useQuery(['notifications.getLikes'])

	const likes = data?.likes

	return (
		<>
			<HeaderBox title={'Notifications'} />
			<SectionPicker>
				<Option href="/notifications/mentions" text="Mentions" />
				<Option href="/notifications/likes" text="Likes" />
				{currentUser?.privacy === 'PRIVATE' && (
					<Option href="/notifications/follow_request" text="Follow requests" />
				)}
			</SectionPicker>
			{isLoading ? (
				<div className="flex items-center justify-center p-4">
					<Spinner />
				</div>
			) : likes!.length > 0 ? (
				likes?.map(({ tweet, user }) => (
					<article
						className="cursor-pointer transition-colors hover:bg-text/[0.03]"
						key={tweet.id + '_' + user.id}
					>
						<Link href={`/users/${tweet.owner.handle}/tweets/${tweet.id}`} passHref>
							<div className="flex gap-4 p-4">
								<Heart className="ml-4 h-8 w-8 fill-candy-pink text-candy-pink" />
								<div className="min-w-0 flex-1">
									<ProfileImage user={user} size="8" />
									<div className="mt-2">
										<span className="font-bold">{user.name}</span> liked your Tweet
									</div>
									<pre className="p0 text-text-grayed">{tweet.text}</pre>
								</div>
							</div>
						</Link>
					</article>
				))
			) : (
				<h2 className="p-4 text-center text-lg font-semibold">Seems like you don&apos;t have any likes</h2>
			)}
		</>
	)
}

export default Likes
