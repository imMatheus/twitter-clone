import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import HeaderBox from '@/components/HeaderBox'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'
import { useAuth } from '@/context/AuthContext'
import { trpc } from '@/utils/trpc'
import Spinner from '@/components/Spinner'
import Button from '@/components/button'
import Link from 'next/link'
import ProfileImage from '@/components/ProfileImage'

const FollowRequest: NextPage = () => {
	const router = useRouter()
	const { currentUser } = useAuth()

	const { data, isLoading } = trpc.useQuery(['notifications.getFollowRequests'])
	const acceptMutation = trpc.useMutation(['notifications.acceptFollowRequest'])
	const utils = trpc.useContext()
	const requests = data?.followRequests

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
			) : requests!.length > 0 ? (
				requests?.map(({ sender }) => (
					<article className="cursor-pointer transition-colors hover:bg-text/[0.03]" key={sender.id}>
						<Link href={`/users/${sender.handle}`} passHref>
							<div className="flex items-start gap-3 p-4">
								<ProfileImage user={sender} size="12" />

								<div className="w-full flex-1">
									<div className="flex justify-between">
										<div className="flex flex-col">
											<Link href={`/users/${sender.handle}`} passHref>
												<a className="cursor-pointer">
													<h2 className="font-bold leading-4">{sender.name}</h2>
												</a>
											</Link>
											<h3 className="text-sm text-text-grayed">@{sender.handle}</h3>
										</div>

										<Button
											variant={'dark'}
											onClick={(e) => {
												e.stopPropagation()
												acceptMutation.mutate(
													{
														senderId: sender.id
													},
													{
														onSuccess() {
															utils.invalidateQueries(['notifications.getFollowRequests'])
														}
													}
												)
											}}
										>
											Accept
										</Button>
									</div>
									<pre className="font-inter">{sender.bio}</pre>
								</div>
							</div>
						</Link>
					</article>
				))
			) : (
				<h2 className="p-4 text-lg font-semibold">Seems like you don&apos;t have any follow requests</h2>
			)}
		</>
	)
}

export default FollowRequest
