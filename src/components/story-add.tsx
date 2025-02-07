import { useNavigate } from 'react-router-dom'

export const StoryAdd = () => {
	const navigate = useNavigate()
	return (
		<div
			className='relative bg-muted w-72 h-44 rounded-xl flex justify-center items-center cursor-pointer hover:bg-primary-foreground transition-all duration-300'
			onClick={() => navigate('/addNewStory')}
		>
			<span className='text-6xl text-center text-foreground'>+</span>
		</div>
	)
}
