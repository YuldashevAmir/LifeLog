import { useStory } from '@/context/storyContext'
import { Label } from '@radix-ui/react-label'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export const Story = () => {
	const navigate = useNavigate()
	const { story } = useStory()

	return (
		<div className='flex flex-col max-w-[700px] mx-auto py-10 px-2 gap-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>Story</h1>
				<X
					className='size-6 cursor-pointer'
					onClick={() => navigate('/dashboard')}
				/>
			</div>
			<div className='text-lg font-semibold'>
				{
					new Date(Number(story.createdAt?.seconds) * 1000)
						.toISOString()
						.split('T')[0]
				}
			</div>
			<div className='flex flex-col gap-2'>
				<h5 className='font-semibold'>Mood</h5>
				<div>{story.mood}</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold'>Morning</Label>
					<p>{story.morning}</p>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold'>Day</Label>
					<p>{story.day}</p>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold'>Evening</Label>
					<p>{story.evening}</p>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold mt-4'>General feelings</Label>
					<div>{story.title}</div>
				</div>
			</div>
		</div>
	)
}
