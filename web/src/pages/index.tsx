import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import Tweet from '@/components/Tweet'
import { Tweet as ITweet } from '@/types/Tweet'
import { useSWR } from '@/hooks/useSWR'

const Home: NextPage = () => {
    const [tweets, error, isLoading] = useSWR<ITweet[]>('/feed')

    console.log(tweets)
    console.log('error', error)

    return (
        <div>
            <h2>hej</h2>

            <TweetsContainer>
                {tweets?.map((tweet) => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </TweetsContainer>
        </div>
    )
}

export default Home
