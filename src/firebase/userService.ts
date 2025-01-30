import { TUser } from '@/types/userTypes'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export const registerUser = async ({ email, password }: TUser) => {
	await createUserWithEmailAndPassword(auth, email, password)

	const user = auth.currentUser
	if (user) {
		await setDoc(doc(db, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			theme: 'light',
		})
	}
}

export const loginUser = async ({ email, password }: TUser) => {
	await signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = async () => {
	try {
		await auth.signOut()
	} catch (error) {
		console.error('Error during logout:', error)
	}
}

export const updateUserTheme = async ({
	uid,
	theme = 'light',
}: Partial<TUser>) => {
	try {
		if (!uid) {
			throw new Error('User ID is required to update theme')
		}

		const userDocRef = doc(db, 'users', uid)

		await updateDoc(userDocRef, {
			theme,
		})

		document.documentElement.className = theme || 'dark'
	} catch (error) {
		console.error('Error updating theme:', error)
	}
}
