import { z } from 'zod'

export const registerFormSchema = z
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

export const loginFormSchema = z.object({
	email: z.string().min(4, {
		message: 'Email must be at least 4 characters.',
	}),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters.',
	}),
})
