import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import TweetBox from '@/components/TweetBox'
import HeaderBox from '@/components/HeaderBox'

const Home: NextPage = () => {
	return (
		<div>
			<HeaderBox title="Home" />
			<TweetBox />
			{/* {tweets && <TweetsContainer tweets={tweets} />} */}
		</div>
	)
}

export default Home
