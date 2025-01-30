import { useEffect, useState } from 'react'
import { auth } from './firebase/firebase'
import { useGetUserData } from './hooks/useGetUserData'
import { AppRouter } from './router/AppRouter'

function App() {
	const { userData, loading } = useGetUserData()

	const [userInfo, setUserInfo] = useState(null)
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUserInfo(user)
		})
	}, [])

	useEffect(() => {
		if (userData) {
			document.documentElement.className = userData.theme || 'dark'
		}
	}, [userData])

	return <AppRouter user={userInfo} />
}

export default App
