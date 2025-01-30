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
import { auth } from '@/firebase/firebase'
import { addStory } from '@/firebase/storyService'
import { TStory } from '@/types/storyTypes'
import { Label } from '@radix-ui/react-label'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AddNewStory = () => {
	const navigate = useNavigate()

	const [story, setStory] = useState<TStory>({
		uid: '',
		mood: '&#9785;',
		title: '',
		description: '',
		morning: '',
		day: '',
		evening: '',
	})

	const fetchUserData = async () => {
		auth.onAuthStateChanged(async user => {
			if (user) {
				setStory({ ...story, uid: user.uid })
			} else {
				navigate('/authorization')
			}
		})
	}

	useEffect(() => {
		fetchUserData()
	}, [])

	const handleAddNewStory = async () => {
		for (const key of Object.keys(story) as (keyof TStory)[]) {
			if (!story[key]) {
				toast.error('Fill all fields', {
					position: 'bottom-center',
					autoClose: 2000,
				})
				return
			}
		}

		await addStory(story)
		navigate('/dashboard')
	}

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
				<Tabs
					defaultValue='sad'
					onValueChange={value => setStory({ ...story, mood: value })}
				>
					<TabsList className='h-full flex-wrap justify-start'>
						<TabsTrigger className='w-12 h-full text-lg' value='&#9785;'>
							&#9785;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128543;'>
							&#128543;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128528;'>
							&#128528;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128529;'>
							&#128529;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128578;'>
							&#128578;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128522;'>
							&#128522;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128515;'>
							&#128515;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128513;'>
							&#128513;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128518;'>
							&#128518;
						</TabsTrigger>
						<TabsTrigger className='w-12 h-full text-lg' value='&#128516;'>
							&#128516;
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<div className='flex flex-col gap-2'>
				<h5 className='font-semibold'>What was happen today</h5>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='title'>Title</Label>
					<Textarea
						onChange={e => setStory({ ...story, title: e.target.value })}
						placeholder='Title of the day ...'
						id='title'
					/>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='morning'>Morning</Label>
					<Textarea
						onChange={e => setStory({ ...story, morning: e.target.value })}
						placeholder='Morning events...'
						id='morning'
					/>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='day'>Day</Label>
					<Textarea
						onChange={e => setStory({ ...story, day: e.target.value })}
						placeholder='Day events...'
						id='day'
					/>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='evening'>Evening</Label>
					<Textarea
						onChange={e => setStory({ ...story, evening: e.target.value })}
						placeholder='Evening events...'
						id='evening'
					/>
				</div>
				<div className='grid w-full gap-1.5'>
					<Label htmlFor='description' className='font-semibold mt-4'>
						General feelings
					</Label>
					<Textarea
						onChange={e => setStory({ ...story, description: e.target.value })}
						placeholder='Feelings...'
						id='description'
					/>
				</div>
				<Button
					onClick={() => handleAddNewStory()}
					className='w-40 mt-4 text-base font-bold'
				>
					Add New Story
				</Button>
			</div>
		</div>
	)
}
