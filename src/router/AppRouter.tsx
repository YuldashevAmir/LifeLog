import { AddNewStory } from '@/pages/AddNewStory'
import { Authorization } from '@/pages/Authorization'
import { Dashboard } from '@/pages/Dashboard'
import { Home } from '@/pages/Home'
import { Story } from '@/pages/Story'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path='/' />
				<Route element={<Authorization />} path='/authorization' />
				<Route element={<Dashboard />} path='/dashboard' />
				<Route element={<AddNewStory />} path='/addNewStory' />
				<Route element={<Story />} path='/story/:storyId' />
			</Routes>
		</BrowserRouter>
	)
}
