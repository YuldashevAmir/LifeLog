import { Outlet } from '@/components/outlet'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useStory } from '@/context/storyContext'
import { getUserStories } from '@/firebase/storyService'
import { useGetUserData } from '@/hooks/useGetUserData'
import { TStory } from '@/types/storyTypes'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dashboard: React.FC = () => {
	const navigate = useNavigate()

	const { userData, loading, error } = useGetUserData()
	const [stories, setStories] = useState<TStory[]>([])
	const [filteredStories, setFilteredStories] = useState<TStory[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedPeriod, setSelectedPeriod] = useState('7') // Default: 7 days

	const { setCurrentStory } = useStory()

	useEffect(() => {
		console.log('error', error)
		const fetchStories = async () => {
			if (!userData) return
			const fetchedStories = await getUserStories(userData.uid)

			// Filter stories by selected period
			const periodMs = Number(selectedPeriod) * 24 * 60 * 60 * 1000
			const now = Date.now()
			const filteredByPeriod = fetchedStories.filter(story => {
				const storyDate = new Date(
					Number(story.createdAt?.seconds) * 1000
				).getTime()
				return now - storyDate <= periodMs
			})

			setStories(filteredByPeriod)
			setFilteredStories(filteredByPeriod)
		}
		if (userData) fetchStories()
	}, [userData, selectedPeriod])

	useEffect(() => {
		// Filter stories based on search term
		const filtered = stories.filter(story =>
			story.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredStories(filtered)
	}, [searchTerm, stories])

	const handleStoryClick = (story: TStory) => {
		setCurrentStory(story)
		navigate(`/story/${story.id}`)
	}

	return (
		<Outlet>
			<div className='p-6 flex flex-col gap-6'>
				<div className='flex gap-6'>
					<Select
						value={selectedPeriod}
						onValueChange={value => setSelectedPeriod(value)}
					>
						<SelectTrigger className='w-72'>
							<SelectValue placeholder='Period' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='7'>7 - days</SelectItem>
							<SelectItem value='30'>30 - days</SelectItem>
						</SelectContent>
					</Select>
					<Input
						className='w-72'
						placeholder='Search'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='flex flex-wrap gap-6'>
					<div
						className='relative bg-muted w-72 h-44 rounded-xl flex justify-center items-center cursor-pointer hover:bg-primary-foreground transition-all duration-300'
						onClick={() => navigate('/addNewStory')}
					>
						<span className='text-6xl text-center text-foreground'>+</span>
					</div>
					{loading ? (
						<div>Loading...</div>
					) : (
						filteredStories.map(story => (
							<div
								className='relative bg-muted w-72 h-44 rounded-xl px-4 py-2 flex flex-col gap-4 cursor-pointer'
								onClick={() => handleStoryClick(story)}
								key={story.id}
							>
								<h5 className='font-semibold'>{story.title}</h5>
								<span className='absolute right-4 top-0 text-2xl'>
									{story.mood}
								</span>
								<p className='text-sm h-full'>{story.description}</p>
								<span className='text-xs font-semibold'>
									{
										new Date(Number(story.createdAt?.seconds) * 1000)
											.toISOString()
											.split('T')[0]
									}
								</span>
							</div>
						))
					)}
				</div>
			</div>
		</Outlet>
	)
}
