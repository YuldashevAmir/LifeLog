import { logoutUser, updateUserTheme } from '@/firebase/userService'
import { useGetUserData } from '@/hooks/useGetUserData'
import { TUser } from '@/types/userTypes'

import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

export const Setting = () => {
	const navigate = useNavigate()

	const { userData, loading } = useGetUserData()

	const handleUpdateTheme = async (theme: 'light' | 'dark') => {
		if (userData) {
			await updateUserTheme({ theme, uid: userData.uid } as Partial<TUser>)
			localStorage.setItem('theme', theme)
		}
	}

	const handleLogout = async () => {
		try {
			await logoutUser()
			navigate('/authorization')
		} catch (error) {
			console.log(error)
		}
	}

	return loading ? (
		<div>loading...</div>
	) : (
		<div className='flex flex-col gap-4'>
			<div>{userData?.email}</div>
			<div className='flex justify-between'>
				<div className='font-semibold'>Theme</div>

				<Select
					defaultValue={userData?.theme}
					onValueChange={value => handleUpdateTheme(value as 'light' | 'dark')}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Theme' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='light'>Light</SelectItem>
						<SelectItem value='dark'>Dark</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Button className='max-w-20' onClick={() => handleLogout()}>
				Logout
			</Button>
		</div>
	)
}
