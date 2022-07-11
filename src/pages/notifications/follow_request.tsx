import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Spinner from '@/components/Spinner'
import HeaderBox from '@/components/HeaderBox'
import { trpc } from '@/utils/trpc'
import { unCastArray } from '@/utils/unCastArray'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'
import ProfileCard from '@/components/profileCard'
import NotFound from '@/components/error/notFound'
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
				<Option href="/notifications" text="All" />
				<Option href="/notifications/mentions" text="Mentions" />
				<Option href="/notifications/likes" text="Likes" />
				{currentUser?.privacy === 'PRIVATE' && (
					<Option href="/notifications/follow_request" text="Follow requests" />
				)}
			</SectionPicker>
		</>
	)
}

export default FollowRequest
