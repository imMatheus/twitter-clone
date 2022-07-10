import twttr from 'twitter-text'

function replaceBetween(origin: string, startIndex: number, endIndex: number, insertion: string) {
	return origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
}

export const generateTweetText = (text: string) => {
	const mentions = twttr.extractMentionsWithIndices(text)
	const hashtags = twttr.extractHashtagsWithIndices(text)
	const mentionsAndHashtags = [...mentions, ...hashtags]
	let indexIncremented = 0

	const leftAddition = <span class="text-accent">
	const rightAddition = '</span>'
	const additionLength = (leftAddition + '@' + rightAddition).length

	mentionsAndHashtags.forEach((occurrence) => {
		text = replaceBetween(
			text,
			occurrence.indices[0] + indexIncremented,
			occurrence.indices[1] + indexIncremented,
			leftAddition +
				('hashtag' in occurrence ? '#' + occurrence.hashtag : '@' + occurrence.screenName) +
				rightAddition
		)
		indexIncremented += additionLength - 1
	})

	return text
}
