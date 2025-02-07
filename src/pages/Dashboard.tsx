import { Outlet } from '@/components/outlet'
import { StoryAdd } from '@/components/story-add'
import { StoryFilters } from '@/components/story-filters'
import { StoryItem } from '@/components/story-item'
import { getUserStories } from '@/firebase/storyService'
import { useGetUserData } from '@/hooks/useGetUserData'
import { TStory } from '@/types/storyTypes'

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dashboard: React.FC = () => {
	const navigate = useNavigate()
	const { userData, loading } = useGetUserData()
	const [stories, setStories] = useState<TStory[]>([])

	const [search, setSearch] = useState<string>('')
	const [selectedPeriod, setSelectedPeriod] = useState<'7' | '30' | 'all'>(
		'all'
	)

	useEffect(() => {
		if (!loading && Object.keys(userData).length === 0)
			navigate('/authorization')
	}, [loading, userData, navigate])

	const filteredStories: TStory[] = useMemo(() => {
		if (selectedPeriod !== 'all' || search) {
			const now = Date.now()
			const periodSec =
				selectedPeriod !== 'all'
					? Number(selectedPeriod) * 24 * 60 * 60
					: Infinity

			return stories.filter(
				story =>
					Math.round(now / 1000) - Number(story.createdAt?.seconds) <=
						periodSec ||
					(search && story.title.toLowerCase().includes(search.toLowerCase()))
			)
		}

		return stories
	}, [search, selectedPeriod, stories])

	useEffect(() => {
		const fetchStories = async () => {
			const fetchedStories = await getUserStories(userData.uid)
			setStories(fetchedStories)
		}
		if (userData) fetchStories()
	}, [userData])

	return (
		<Outlet>
			<div className='p-6 flex flex-col gap-6'>
				<StoryFilters
					search={search}
					setSearch={setSearch}
					selectedPeriod={selectedPeriod}
					setSelectedPeriod={setSelectedPeriod}
				/>
				<div className='flex flex-wrap gap-6'>
					<StoryAdd />
					{loading ? (
						<div>Loading...</div>
					) : (
						filteredStories.map(story => (
							<StoryItem story={story} key={story.id} />
						))
					)}
				</div>
			</div>
		</Outlet>
	)
}
