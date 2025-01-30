import { TUser } from '@/types/userTypes'
import { FirebaseError } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export const registerUser = async ({ email, password }: TUser) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)

		const user = auth.currentUser
		if (user) {
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				email: user.email,
				theme: 'light',
			})
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			const firebaseError = error as FirebaseError
			throw new Error(firebaseError.code)
		} else {
			throw new Error('unknown error')
		}
	}
}

export const loginUser = async ({ email, password }: TUser) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password)
		return response
	} catch (error: unknown) {
		if (error instanceof Error) {
			const firebaseError = error as FirebaseError
			throw new Error(firebaseError.code)
		} else {
			throw new Error('unknown error')
		}
	}
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
