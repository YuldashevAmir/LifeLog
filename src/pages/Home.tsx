import homeImage from '@/assets/images/homeImage.webp'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
	const navigate = useNavigate()

	return (
		<div className='flex justify-center items-center min-h-screen flex-wrap-reverse'>
			<div className='flex flex-col w-full max-w-[500px] gap-6 px-10 min-w-72'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					LifeLog
				</h1>
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					Your life, one log at a time
				</h3>
				<p className='leading-7 [&:not(:first-child)]:mt-6'>
					LifeLog is your personal space to capture and reflect on daily
					moments. Track your moods, write about your experiences, and visualize
					your emotional journey through beautiful charts and insights. Whether
					it's a small win or a deep reflection, LifeLog helps you stay
					connected with yourself—one day at a time. Start logging today and
					watch your story unfold!
				</p>
				<Button
					onClick={() => navigate('/authorization')}
					className='h-10 text-lg font-bold w-40'
				>
					Start Your Log
				</Button>
			</div>

			<div className='w-full max-w-[400px] p-4'>
				<img className='rounded-3xl' src={homeImage} alt='Writing Image' />
			</div>
		</div>
	)
}
