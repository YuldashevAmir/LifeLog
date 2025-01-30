import { auth, db } from '@/firebase/firebase'
import { TUser } from '@/types/userTypes'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useGetUserData = () => {
	const [userData, setUserData] = useState<TUser | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
			if (user) {
				try {
					const docRef = doc(db, 'users', user.uid)
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()) {
						setUserData({ uid: user.uid, ...docSnap.data() } as TUser)
					} else {
						console.log('No such document!')
					}
				} catch (error) {
					console.error('Error fetching user data:', error)
				}
			} else {
				throw Error
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	return { userData, loading }
}
