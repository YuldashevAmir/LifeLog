import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const AddNewStory = () => {
	const navigate = useNavigate()
	const [mood, setMood] = useState<string>('sad')

	return (
		<div className='flex flex-col max-w-[700px] mx-auto py-10 px-2 gap-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>Add New Story</h1>
				<AlertDialog>
					<AlertDialogTrigger>
						<X className='size-6 cursor-pointer' />
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you sure you want to leave this page? Unsaved data will be
								lost.
							</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={() => navigate('/dashboard')}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
			<div className='flex flex-col gap-2'>
				<h5 className='font-semibold'>Choose your mood for today</h5>
				<Tabs defaultValue='sad' onValueChange={value => setMood(value)}>
					<TabsList className='h-full flex-wrap justify-start'>
						<TabsTrigger className='w-12 h-full text-lg' value='sad'>
							&#9785;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='disappointed'>
							&#128543;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='meh'>
							&#128528;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='neutral'>
							&#128529;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='content'>
							&#128578;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='happy'>
							&#128522;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='joyful'>
							&#128515;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='excited'>
							&#128513;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='thrilled'>
							&#128518;
						</TabsTrigger>

						<TabsTrigger className='w-12 h-full text-lg' value='excellent'>
							&#128516;
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<div className='flex flex-col gap-2'>
				<h5 className='font-semibold'>What was happen today</h5>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='message'>Morning</Label>
					<Textarea placeholder='Morning events...' id='message' />
				</div>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='message'>Day</Label>
					<Textarea placeholder='Day events...' id='message' />
				</div>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='message'>Evening</Label>
					<Textarea placeholder='Evening events...' id='message' />
				</div>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='message' className='font-semibold mt-4'>
						General feelings
					</Label>
					<Textarea placeholder='Feelings...' id='message' />
				</div>
				<Button
					onClick={() => navigate('/dashboard')}
					className='w-40 mt-4 text-base font-bold'
				>
					Add New Story
				</Button>
			</div>
		</div>
	)
}
