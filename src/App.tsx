import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoryProvider } from './context/storyContext'
import { AppRouter } from './router/AppRouter'

function App() {
	useEffect(() => {
		document.documentElement.className = localStorage.getItem('theme') || 'dark'
	}, [])

	return (
		<StoryProvider>
			<AppRouter />
			<ToastContainer />
		</StoryProvider>
	)
}

export default App
