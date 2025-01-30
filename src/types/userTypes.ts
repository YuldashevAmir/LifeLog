export type TUser = {
	uid?: string
	email: string
	password: string
	confirmPassword?: string
	theme?: 'light' | 'dark'
}
