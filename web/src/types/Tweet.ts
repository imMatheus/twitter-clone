import { User } from './User'

export type Tweet = {
	id: string
	createdAt: string
	updatedAt: string
	text: string
	ownerId: string
	owner: User
}
