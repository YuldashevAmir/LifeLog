import { TStory } from '@/types/storyTypes'
import {
	addDoc,
	collection,
	getDocs,
	query,
	serverTimestamp,
	where,
} from 'firebase/firestore'
import { db } from './firebase'

export const getUserStories = async (userId: string) => {
	try {
		const storiesRef = collection(db, 'stories')
		const q = query(storiesRef, where('uid', '==', userId))
		const querySnapshot = await getDocs(q)

		const stories = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}))

		return stories as TStory[]
	} catch {
		return [] as TStory[]
	}
}

export const addStory = async ({
	uid,
	mood,
	title,
	description,
	morning,
	day,
	evening,
}: TStory) => {
	try {
		const response = await addDoc(collection(db, 'stories'), {
			uid,
			title,
			description,
			mood,
			morning,
			day,
			evening,
			createdAt: serverTimestamp(),
		} as TStory)
		return response
	} catch {
		throw Error
	}
}
