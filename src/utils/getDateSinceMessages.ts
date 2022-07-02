import dateFormat from 'dateformat'

export function getDateSinceMessages(d: string | Date) {
	let timeNow: any = new Date()
	let timePost: any = new Date(d)
	const secsNow = Math.floor(timeNow / 1000)
	const secsPost = Math.floor(timePost / 1000)
	let diff = Math.abs(secsNow - secsPost)

	if (diff < 60 * 60 * 24) return dateFormat(timePost, 'h:MM TT') // within 1 day
	if (diff < 60 * 60 * 24 * 7) return dateFormat(timePost, 'dddd, h:MM TT') // within 1 week
	return dateFormat(timePost, 'mmmm d, yyyy, h:MM TT') // within 1 year
}
