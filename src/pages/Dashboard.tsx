import { Sidebar } from '@/components/sidebar'

import { useNavigate } from 'react-router-dom'
export const Dashboard = () => {
	const navigate = useNavigate()

	return (
		<Sidebar>
			<div className='p-6'>
				<div className='flex flex-wrap gap-6'>
					<div
						className='relative bg-muted w-72 h-44 rounded-xl flex justify-center items-center cursor-pointer hover:bg-primary-foreground transition-all duration-300'
						onClick={() => navigate('/addNewStory')}
					>
						<span className='text-6xl text-center text-foreground'>+</span>
					</div>
					<div
						className='relative bg-muted w-72 h-44 rounded-xl px-4 py-2 flex flex-col gap-4 cursor-pointer'
						onClick={() => navigate('/story/1')}
					>
						<h5 className='font-semibold'>Title of day</h5>
						<span className='absolute right-4 top-0 text-2xl'>&#x263A;</span>
						<p className='text-sm'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab,
							natus iusto in repellendus cumque aperiam ad. Id est numquam quod.
						</p>
						<span className='text-xs font-semibold'>02-01-2025</span>
					</div>
				</div>
			</div>
		</Sidebar>
	)
}
