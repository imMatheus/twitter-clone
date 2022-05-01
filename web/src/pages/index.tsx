import type { NextPage } from 'next'
import { useState } from 'react'
import Tweet from '@/components/Tweet'
import { Tweet as ITweet } from '@/types/Tweet'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

const Home: NextPage = () => {
    const { data, error } = useSWR<ITweet[]>(
        'http://localhost:4000/feed',
        fetcher
    )
    const [tweets, setTweets] = useState<ITweet[]>([])

    console.log(data)
    console.log('error', error)

    // useEffect(() => {
    //     async function go() {
    //         const { data } = await axios.get('http://localhost:4000/feed')
    //         console.log(data)
    //         setTweets(data)
    //     }
    //     go()
    // }, [])

    return (
        <div>
            <h2>hej</h2>

            <div className='bg-green-500'>
                {data?.map((tweet) => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </div>
    )
}

export default Home
