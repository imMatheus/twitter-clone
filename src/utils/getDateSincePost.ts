import dateConverter from 'date-and-time'

export function getDateSincePost(d: string | Date) {
	let timeNow: any = new Date()
	let timePost: any = new Date(d)
	const secsNow = Math.floor(timeNow / 1000)
	const secsPost = Math.floor(timePost / 1000)
	let diff = Math.abs(secsNow - secsPost)

	if (diff < 60) return diff + ' secs' // within 1 minute
	if (diff < 60 * 60) return Math.floor(diff / 60) + ' min' // within 1 hour
	if (diff < 60 * 60 * 2) return Math.floor(diff / 3600) + ' hour' // within 2 hours
	if (diff < 60 * 60 * 24) return Math.floor(diff / 3600) + ' hours' // within 1 day
	return dateConverter.format(timePost, 'DD MMM') // just returns date
}
