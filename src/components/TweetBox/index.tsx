import React, { useState } from 'react'
import ProfileImage from '@/components/ProfileImage'
import styles from 'styles/TweetBox.module.scss'
import { Textarea } from '@mantine/core'
import { Image as ImageIcon, BarChart2, Smile, Calendar, MapPin } from 'react-feather'
import LengthCircleTracker from './LengthCircleTracker'
import { trpc } from '@/utils/trpc'
import { useAuth } from '@/context/AuthContext'
import { MAX_LENGTHS } from '@/constants'
import { generateTweetText } from '@/utils/generateTweetText'

interface TweetBoxProps {
	tweetId?: string
	placeholder?: string
}

const TweetBox: React.FC<TweetBoxProps> = ({ tweetId, placeholder }) => {
	const MAX_TEXT_LENGTH = MAX_LENGTHS.tweet
	const { currentUser } = useAuth()
	const utils = trpc.useContext()
	const postMutation = trpc.useMutation('tweets.post', {
		onSuccess() {
			if (tweetId) return utils.invalidateQueries(['tweets.byId'])
			utils.invalidateQueries(['tweets.feed'])
		}
	})

	const [text, setText] = useState('')
	const lettersLeft = MAX_TEXT_LENGTH - text.length
	const textLengthHasSurpassedMax = lettersLeft < 1

	async function sendTweet() {
		setText('')
		if (tweetId)
			return postMutation.mutate(
				{ text, tweetId },
				{
					onSuccess() {
						utils.invalidateQueries(['tweets.getRepliesById'])
						utils.invalidateQueries(['tweets.byId'])
					}
				}
			)
		postMutation.mutate({ text })
	}

	return (
		<div className="flex gap-4 border-b border-b-border p-4">
			<div className="flex-shrink-0">
				{currentUser ? <ProfileImage user={currentUser} size="12" /> : <div className="h-12 w-12"></div>}
			</div>
			<div className="w-full">
				<div className="text-xl">
					<Textarea
						placeholder={placeholder || 'Whats happening'}
						autosize
						// dangerouslySetInnerHTML={{
						// 	__html: generateTweetText(text)
						// }}
						value={text}
						onChange={(e) => setText(e.currentTarget.value)}
						minRows={1}
						variant="unstyled"
						className="border-none"
						aria-label="Write a tweet"
						styles={{
							input: {
								color: 'rgb(var(--text)) !important'
							}
						}}
						size="xl"
					/>
				</div>

				<div className="mt-3 flex items-center justify-between">
					<div className="flex gap-4">
						<div className="group relative flex h-5 w-5 cursor-pointer items-center justify-center">
							<div className="absolute h-9 w-9 rounded-full bg-transparent opacity-10 transition-colors group-hover:bg-accent"></div>
							<ImageIcon className="h-full w-full text-accent" />
						</div>
						<div className="group relative flex h-5 w-5 cursor-pointer items-center justify-center">
							<div className="absolute h-9 w-9 rounded-full bg-transparent opacity-10 transition-colors group-hover:bg-accent"></div>
							<BarChart2 className="h-full w-full text-accent" />
						</div>
						<div className="group relative flex h-5 w-5 cursor-pointer items-center justify-center">
							<div className="absolute h-9 w-9 rounded-full bg-transparent opacity-10 transition-colors group-hover:bg-accent"></div>
							<Smile className="h-full w-full text-accent" />
						</div>
						<div className="group relative flex h-5 w-5 cursor-pointer items-center justify-center">
							<div className="absolute h-9 w-9 rounded-full bg-transparent opacity-10 transition-colors group-hover:bg-accent"></div>
							<Calendar className="h-full w-full text-accent" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<LengthCircleTracker MAX_TEXT_LENGTH={MAX_TEXT_LENGTH} text={text} />
						<button
							onClick={sendTweet}
							className="min-h-[2.25rem] flex-shrink-0 rounded-full bg-accent px-4 font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
							disabled={text.length < 1 || text.length > MAX_TEXT_LENGTH}
						>
							Tweet
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TweetBox
