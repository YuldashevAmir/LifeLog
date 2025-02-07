import { auth, db } from '@/firebase/firebase'
import { TUser } from '@/types/userTypes'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useGetUserData = () => {
	const [userData, setUserData] = useState<TUser>({} as TUser)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>('')

	const navigate = useNavigate()
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
			if (user) {
				try {
					const docRef = doc(db, 'users', user.uid)
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()) {
						setUserData({ uid: user.uid, ...docSnap.data() } as TUser)
					} else {
						setError('No such document!')
						console.log('No such document!')
					}
				} catch (error) {
					setError('Error fetching user data')
					console.error('Error fetching user data:', error)
				}
			} else {
				setError('User not authorized')
				console.error('User not authorized', error)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [navigate])

	return { userData, loading, error }
}
