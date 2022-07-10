import twttr from 'twitter-text'

function replaceBetween(origin: string, startIndex: number, endIndex: number, insertion: string) {
	return origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
}

export const generateTweetText = (text: string) => {
	const mentions = twttr.extractMentionsWithIndices(text)
	const hashtags = twttr.extractHashtagsWithIndices(text)
	const mentionsAndHashtags = [...mentions, ...hashtags].sort((a, b) => (a.indices[0] < b.indices[0] ? -1 : 1))
	if (mentionsAndHashtags.length === 0) return text
	const arr: any[] = []
	let i = 0

	mentionsAndHashtags.forEach((occurrence, index) => {
		arr.push(text.slice(i, occurrence.indices[0]))
		arr.push(
			<a
				className="text-accent hover:underline"
				href={'hashtag' in occurrence ? `/explore?q=${occurrence.hashtag}` : `/users/${occurrence.screenName}`}
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

	return arr
}
