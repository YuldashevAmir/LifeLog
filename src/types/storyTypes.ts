import { Timestamp } from 'firebase/firestore'

export type TStory = {
	id?: string
	uid: string
	mood: string
	title: string
	description: string
	morning: string
	day: string
	evening: string
	createdAt?: Timestamp
}
