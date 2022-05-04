import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import { Tweet as ITweet } from '@/types/Tweet'
import { useSWR } from '@/hooks/useSWR'

const Home: NextPage = () => {
    const [tweets, error, isLoading] = useSWR<ITweet[]>('/feed')

    console.log(tweets)
    console.log('error', error)

    return (
        <div>
            <h2>hej</h2>

            {tweets && <TweetsContainer tweets={tweets} />}
        </div>
    )
}

export default Home
