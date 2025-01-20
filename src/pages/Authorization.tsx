import { LoginForm } from '@/components/login-form'
import { RegisterForm } from '@/components/register-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Authorization = () => {
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
