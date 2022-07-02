import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import TweetBox from '@/components/TweetBox'
import HeaderBox from '@/components/HeaderBox'
import { useAuth } from '@/context/AuthContext'
import { trpc } from '@/utils/trpc'
import Spinner from '@/components/Spinner'
import ProfileCard from '@/components/profileCard'

const Home: NextPage = () => {
	const { currentUser } = useAuth()
	const { data, isLoading } = trpc.useQuery(['tweets.feed'])
	const { data: followSuggestion } = trpc.useQuery(['users.followSuggestion'])

	return (
		<div>
			<HeaderBox title="Home" />
			{currentUser && <TweetBox />}
			{isLoading && (
				<div className="flex justify-center">
					<Spinner />
				</div>
			)}
			{data?.tweets && <TweetsContainer tweets={data.tweets} />}
			<div>
				<h2 className="">Seems like you have no more Tweets </h2>
				{followSuggestion?.users.map((user) => (
					<ProfileCard user={user} key={user.id} />
				))}
			</div>
		</div>
	)
}

export default Home
