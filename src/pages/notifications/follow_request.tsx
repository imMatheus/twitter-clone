import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import HeaderBox from '@/components/HeaderBox'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'
import { useAuth } from '@/context/AuthContext'

const FollowRequest: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query
	const { currentUser } = useAuth()

	// const { data, isLoading } = trpc.useQuery(['users.getFollowers', { handle: unCastArray(handle) }])

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
			<h2 className="p-4 text-lg font-semibold">Seems like you don&apos;t have any follow requests</h2>
		</>
	)
}

export default FollowRequest
