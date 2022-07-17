import React from 'react'
import twttr from 'twitter-text'

export const generateTweetText = (text: string) => {
	const mentions = twttr.extractMentionsWithIndices(text)
	const hashtags = twttr.extractHashtagsWithIndices(text)
	const mentionsAndHashtags = [...mentions, ...hashtags].sort((a, b) => (a.indices[0] < b.indices[0] ? -1 : 1))

	if (mentionsAndHashtags.length === 0) return text

	const arr: React.ReactNode[] = []
	let i = 0

	mentionsAndHashtags.forEach((occurrence, index) => {
		arr.push(text.slice(i, occurrence.indices[0]))
		arr.push(
			<a
				className="text-accent hover:underline"
				href={
					'hashtag' in occurrence ? `/explore?q=%23${occurrence.hashtag}` : `/users/${occurrence.screenName}`
				}
				onClick={(e) => {
					e.stopPropagation()
				}}
				key={index}
			>
				{text.substring(occurrence.indices[0], occurrence.indices[1])}
			</a>
		)

		i = occurrence.indices[1]
	})

	arr.push(
		text.substring(mentionsAndHashtags[mentionsAndHashtags.length - 1]?.indices[1] || text.length, text.length)
	)

	return arr
}
