import { User } from './User'

export type Tweet = {
    id: string
    createdAt: Date
    updatedAt: Date
    text: string
    ownerId: string
    owner: User
}
