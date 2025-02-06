import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useToggle } from '@/hooks/useToggle.ts'
import { DialogTrigger } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { AlignJustify, Settings, X } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Setting } from './setting-modal'
interface OutletProps {
	children: React.ReactNode
}
export const Outlet: React.FC<OutletProps> = ({ children }) => {
	const [showSideBar, toggleSideBarVisible] = useToggle()

	return (
		<div className='flex'>
			<div
				className={clsx(
					'min-w-72 min-h-screen bg-accent lg:translate-x-0 flex flex-col gap-4 lg:relative absolute z-10 p-6 transition-all duration-300 ease-in-out',
					showSideBar ? 'translate-x-0' : '-translate-x-full'
				)}
			>
				<X
					className='lg:hidden cursor-pointer mb-2'
					onClick={toggleSideBarVisible}
				/>

				<nav>
					<Link
						to='/dashboard'
						className='bg-background rounded-lg py-2 pl-2 font-medium  flex cursor-pointer'
					>
						Dashboard
					</Link>
				</nav>
			</div>
			<div className='flex flex-col w-full'>
				<div className='h-20 flex justify-between items-center px-6'>
					<AlignJustify
						onClick={toggleSideBarVisible}
						className='text-foreground cursor-pointer lg:w-0'
					/>

					<Dialog>
						<DialogTrigger asChild>
							<Settings className='cursor-pointer text-foreground' />
						</DialogTrigger>
						<DialogContent className='sm:max-w-md '>
							<DialogHeader>
								<DialogTitle>Settings</DialogTitle>
							</DialogHeader>
							<Setting />
						</DialogContent>
					</Dialog>
				</div>
				{children}
			</div>
		</div>
	)
}
