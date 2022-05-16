import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import { Tweet as ITweet } from '@/types/Tweet'
import { useQuery } from '@/hooks/useQuery'
import TweetBox from '@/components/TweetBox'

const Home: NextPage = () => {
	const [tweets, error, isLoading] = useQuery<ITweet[]>('/feed')

	console.log(tweets)
	console.log('error', error)

	return (
		<div>
			{/* <TweetBox /> */}
			{tweets && <TweetsContainer tweets={tweets} />}
		</div>
	)
}

export default Home
