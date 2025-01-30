import { Sidebar } from '@/components/sidebar'
import { useStory } from '@/context/storyContext'
import { getUserStories } from '@/firebase/storyService'
import { useGetUserData } from '@/hooks/useGetUserData'
import { TStory } from '@/types/storyTypes'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dashboard: React.FC = () => {
	const navigate = useNavigate()

	const { userData, loading } = useGetUserData()
	const [stories, setStories] = useState<TStory[]>([])

	const { setCurrentStory } = useStory()

	useEffect(() => {
		const fetchStories = async () => {
			const fetchedStories = await getUserStories(userData?.uid || '')
			setStories(fetchedStories)
		}
		if (userData) fetchStories()
	}, [userData])

	const handleStoryClick = (story: TStory) => {
		setCurrentStory(story)
		navigate(`/story/${story.id}`)
	}

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
					{loading ? (
						<div>loading</div>
					) : (
						stories &&
						stories.map(story => (
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
		</Sidebar>
	)
}
