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

const Notifications: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query

	// const { data, isLoading } = trpc.useQuery(['users.getFollowers', { handle: unCastArray(handle) }])

	// const user = data?.user

	// if (isLoading)
	// 	return (
	// 		<div className="flex h-screen items-center justify-center">
	// 			<Spinner />
	// 		</div>
	// 	)

	// if (!user) return <NotFound />

	return (
		<>
			<HeaderBox title={'Notifications'} />
			<SectionPicker>
				<Option href="/notifications" text="All" />
				<Option href="/notifications/mentions" text="Mentions" />
			</SectionPicker>
			hej
			{/* {user?.followers.length > 0 ? (
				user.followers.map(({ follower }) => <ProfileCard key={follower.id} user={follower} />)
			) : (
				<h2 className="p-4 text-lg font-semibold">Seems like {user.name} does not follow anyone</h2>
			)} */}
		</>
	)
}

export default Notifications
