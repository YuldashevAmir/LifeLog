import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginUser } from '@/firebase/userService'
import { useToggle } from '@/hooks/useToggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginFormSchema as formSchema } from './constants/schemas'
export function LoginForm() {
	const navigate = useNavigate()

	const [showPassword, togglePasswordVisibility] = useToggle(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(userData: z.infer<typeof formSchema>) {
		try {
			await loginUser(userData)
			navigate('/dashboard')
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === 'auth/invalid-credential') {
					toast.error('Incorrect Email or Password', {
						position: 'bottom-center',
						autoClose: 3000,
					})
				} else {
					toast.error('An error occurred. Please try again.')
				}
			} else {
				toast.error('An unknown error occurred.')
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 w-full max-w-72'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder='password'
										{...field}
									/>
									<button
										type='button'
										onClick={togglePasswordVisibility}
										className='absolute top-1/2 right-3 transform -translate-y-1/2'
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Login</Button>
			</form>
		</Form>
	)
}
