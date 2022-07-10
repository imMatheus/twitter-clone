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

const Mentions: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query

	const { data, isLoading } = trpc.useQuery(['notifications.getMentions'])

	console.log('bbiiaudsahdabsd')
	console.log(data)

	const mentions = data?.mentions

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
			{isLoading ? (
				<div className="flex items-center justify-center p-4">
					<Spinner />
				</div>
			) : mentions!.length > 0 ? (
				mentions?.map(({ tweet }) => <TweetCard key={tweet.id} tweet={tweet} />)
			) : (
				<h2 className="p-4 text-center text-lg font-semibold">Seems like you don&apos;t have any mentions</h2>
			)}
		</>
	)
}

export default Mentions
