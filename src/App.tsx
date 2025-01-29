import { useEffect, useState } from 'react'
import { auth } from './components/firebase'
import { AppRouter } from './router/AppRouter'

function App() {
	document.documentElement.className = 'light'

	const [userInfo, setUserInfo] = useState(null)
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUserInfo(user)
		})
	}, [])

	return <AppRouter user={userInfo} />
}

export default App
