import { User } from './User'
import { Tweet } from './Tweet'

export type UserWithTweets = { tweets: Tweet[]; numberOfTweets: number } & User
