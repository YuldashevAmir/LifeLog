import { LoginForm } from '@/components/login-form'
import { RegisterForm } from '@/components/register-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetUserData } from '@/hooks/useGetUserData'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Authorization = () => {
	const navigate = useNavigate()
	const { userData, loading } = useGetUserData()

	useEffect(() => {
		if (!loading && Object.keys(userData).length > 0) navigate('/dashboard')
	}, [loading, userData, navigate])

	return (
		<div className='flex flex-col pt-96 items-center min-h-screen'>
			<Tabs defaultValue='Login' className='w-72'>
				<TabsList>
					<TabsTrigger value='Login'>Login</TabsTrigger>
					<TabsTrigger value='Register'>Register</TabsTrigger>
				</TabsList>
				<TabsContent value='Login'>
					<LoginForm></LoginForm>
				</TabsContent>
				<TabsContent value='Register'>
					<RegisterForm></RegisterForm>
				</TabsContent>
			</Tabs>
		</div>
	)
}
