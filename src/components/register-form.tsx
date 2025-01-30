import { useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'

import { registerUser } from '@/firebase/userService'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const formSchema = z
	.object({
		email: z
			.string()
			.min(4, { message: 'Email must be at least 4 characters.' })
			.email({ message: 'Please enter a valid email address.' }),

		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters.' })
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter.',
			})
			.regex(/[a-z]/, {
				message: 'Password must contain at least one lowercase letter.',
			})
			.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
			.regex(/[\W_]/, {
				message: 'Password must contain at least one special character.',
			}),

		confirmPassword: z
			.string()
			.min(6, { message: 'Confirm password must be at least 6 characters.' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

export function RegisterForm() {
	const navigate = useNavigate()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const togglePasswordVisibility = () => setShowPassword(prev => !prev)
	const toggleConfirmPasswordVisibility = () =>
		setShowConfirmPassword(prev => !prev)

	async function onSubmit(userData: z.infer<typeof formSchema>) {
		try {
			await registerUser(userData)
			navigate('/dashboard')
		} catch (error) {
			console.log('error', error)
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

				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder='confirm password'
										{...field}
									/>
									<button
										type='button'
										onClick={toggleConfirmPasswordVisibility}
										className='absolute top-1/2 right-3 transform -translate-y-1/2'
									>
										{showConfirmPassword ? (
											<EyeOff size={20} />
										) : (
											<Eye size={20} />
										)}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Register</Button>
			</form>
		</Form>
	)
}
