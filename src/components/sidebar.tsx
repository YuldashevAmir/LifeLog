import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useToggle } from '@/hooks/useToggle'
import { DialogTrigger } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { AlignJustify, Settings, X } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
interface SidebarProps {
	children: React.ReactNode
}
export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
	const [state, toggle] = useToggle() as [boolean, () => void]

	const navigate = useNavigate()

	return (
		<div className='flex'>
			<div
				className={clsx(
					'min-w-72 min-h-screen bg-accent lg:translate-x-0 flex flex-col gap-4 lg:relative absolute z-10 p-6 transition-all duration-300 ease-in-out',
					state ? 'translate-x-0' : '-translate-x-full'
				)}
			>
				<X className='lg:hidden cursor-pointer mb-2' onClick={() => toggle()} />

				<div
					className='bg-background rounded-lg py-2 pl-2 font-medium  flex cursor-pointer'
					onClick={() => navigate('/dashboard')}
				>
					Dashboard
				</div>
				<div
					className='bg-background rounded-lg py-2 pl-2 font-regular  cursor-pointer flex'
					onClick={() => navigate('/statistics')}
				>
					Statistics
				</div>
			</div>
			<div className='flex flex-col w-full'>
				<div className='h-20 flex justify-between items-center px-6'>
					<AlignJustify
						onClick={() => toggle()}
						className='text-foreground cursor-pointer'
					/>

					<Dialog>
						<DialogTrigger asChild>
							<Settings className='cursor-pointer text-foreground' />
						</DialogTrigger>
						<DialogContent className='sm:max-w-md '>
							<DialogHeader>
								<DialogTitle>Settings</DialogTitle>
							</DialogHeader>
							<div className='flex flex-col gap-4'>
								<div>amir1008047@gmail.com</div>
								<div className='flex justify-between'>
									<div className='font-semibold'>Theme</div>
									<Select>
										<SelectTrigger className='w-[180px]'>
											<SelectValue placeholder='Theme' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='light'>Light</SelectItem>
											<SelectItem value='dark'>Dark</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
				{children}
			</div>
		</div>
	)
}
