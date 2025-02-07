import { useStory } from '@/context/storyContext'
import { TStory } from '@/types/storyTypes'
import { useNavigate } from 'react-router-dom'

export const StoryItem = ({ story }: { story: TStory }) => {
	const navigate = useNavigate()
	const { setCurrentStory } = useStory()

	const handleStoryClick = (story: TStory) => {
		setCurrentStory(story)
		navigate(`/story/${story.id}`)
	}

	return (
		<div
			className='relative bg-muted w-72 h-44 rounded-xl px-4 py-2 flex flex-col gap-4 cursor-pointer'
			onClick={() => handleStoryClick(story)}
			key={story.id}
		>
			<h5 className='font-semibold'>{story.title}</h5>
			<span className='absolute right-4 top-0 text-2xl'>{story.mood}</span>
			<p className='text-sm h-full'>{story.description}</p>
			<span className='text-xs font-semibold'>
				{
					new Date(Number(story.createdAt?.seconds) * 1000)
						.toISOString()
						.split('T')[0]
				}
			</span>
		</div>
	)
}
