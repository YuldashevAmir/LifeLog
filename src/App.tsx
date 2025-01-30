import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoryProvider } from './context/storyContext'
import { auth } from './firebase/firebase'
import { useGetUserData } from './hooks/useGetUserData'
import { AppRouter } from './router/AppRouter'
import { TUser } from './types/userTypes'

function App() {
	const { userData } = useGetUserData()

	const [userInfo, setUserInfo] = useState<TUser | null>(null)
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUserInfo(user as TUser | null)
		})
	}, [])

	useEffect(() => {
		if (userData) {
			document.documentElement.className = userData.theme || 'dark'
		}
	}, [userData])

	return (
		<StoryProvider>
			<AppRouter user={userInfo} />
			<ToastContainer />
		</StoryProvider>
	)
}

export default App
