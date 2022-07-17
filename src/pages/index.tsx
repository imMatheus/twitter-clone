import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import TweetBox from '@/components/TweetBox'
import HeaderBox from '@/components/HeaderBox'
import { useAuth } from '@/context/AuthContext'
import { trpc } from '@/utils/trpc'
import Spinner from '@/components/Spinner'
import ProfileCard from '@/components/profileCard'
import Button from '@/components/button'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
	const { currentUser, login } = useAuth()

	const { data: session } = useSession()
	const { data, isLoading } = trpc.useQuery(['tweets.feed'])
	const { data: followSuggestion } = trpc.useQuery(['users.followSuggestion'])

	return (
		<div>
			<HeaderBox title="Home" />

			{currentUser && (
				<>
					<TweetBox />
					{data?.tweets && <TweetsContainer tweets={data.tweets} />}

					<h2 className="border-t border-t-border p-4 pt-8 text-xl font-bold">You might like</h2>
					{followSuggestion?.users.map((user) => (
						<ProfileCard user={user} key={user.id} />
					))}
				</>
			)}
			{isLoading ? (
				<div className="flex h-screen items-center justify-center">
					<Spinner />
				</div>
			) : !session ? (
				<div className="p-4">
					<h2 className="mb-2 text-3xl font-extrabold">
						Welcome to my Twitter clone. Please sign in to get started
					</h2>
					<p className="mb-6 text-text-grayed">Sign in via a GitHub or Google account</p>
					<Button variant="dark" size="large" onClick={() => login()}>
						Sign in
					</Button>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default Home
