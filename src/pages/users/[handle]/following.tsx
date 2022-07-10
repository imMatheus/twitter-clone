import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Spinner from '@/components/Spinner'
import HeaderBox from '@/components/HeaderBox'
import { trpc } from '@/utils/trpc'
import { unCastArray } from '@/utils/unCastArray'
import ProfileCard from '@/components/profileCard'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'
import NotFound from '@/components/error/notFound'

const Following: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query

	const { data, isLoading } = trpc.useQuery(['users.getFollowing', { handle: unCastArray(handle) }])

	const user = data?.user

	if (isLoading)
		return (
			<div className="flex h-screen items-center justify-center">
				<Spinner />
			</div>
		)

	if (!user) return <NotFound />

	return (
		<>
			<HeaderBox goBack goBackHref={`/users/${user.handle}`} title={user.name} subtitle={'@' + user.handle} />
			<SectionPicker>
				<Option href={`/users/${user.handle}/followers`} text="Followers" />
				<Option href={`/users/${user.handle}/following`} text="Following" />
			</SectionPicker>
			{user?.following.length > 0 ? (
				user.following.map(({ following }) => <ProfileCard key={following.id} user={following} />)
			) : (
				<h2 className="p-4 text-lg font-semibold">Seems like {user.name} does not have any followers</h2>
			)}
		</>
	)
}

export default Following
