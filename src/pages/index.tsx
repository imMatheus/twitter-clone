import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import TweetBox from '@/components/TweetBox'
import HeaderBox from '@/components/HeaderBox'
import { useAuth } from '@/context/AuthContext'
import { trpc } from '@/utils/trpc'

const Home: NextPage = () => {
	const { currentUser } = useAuth()
	const { data, isLoading } = trpc.useQuery(['tweets.feed'])

	return (
		<div>
			<HeaderBox title="Home" />
			{currentUser && <TweetBox />}
			{data?.tweets && <TweetsContainer tweets={data.tweets} />}
		</div>
	)
}

export default Home
