import { Label } from '@radix-ui/react-label'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export const Story = () => {
	const navigate = useNavigate()

	return (
		<div className='flex flex-col max-w-[700px] mx-auto py-10 px-2 gap-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>Story #1111</h1>
				<X
					className='size-6 cursor-pointer'
					onClick={() => navigate('/dashboard')}
				/>
			</div>
			<div className='text-lg font-semibold'>02-01-2025</div>
			<div className='flex flex-col gap-2'>
				<h5 className='font-semibold'>Mood</h5>
				<div>&#128516;</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold'>Morning</Label>
					<p>Morning events</p>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold'>Day</Label>
					<p>Day event</p>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold'>Evening</Label>
					<p>Evening event</p>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label className='font-semibold mt-4'>General feelings</Label>
					<div>Feelings</div>
				</div>
			</div>
		</div>
	)
}
