import { auth, db } from '@/components/firebase'
import { Sidebar } from '@/components/sidebar'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface UserDetails {
	email: string
}

export const Dashboard: React.FC = () => {
	const navigate = useNavigate()
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

	const fetchUserData = async () => {
		auth.onAuthStateChanged(async user => {
			if (user) {
				try {
					const docRef = doc(db, 'users', user.uid)
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()) {
						setUserDetails(docSnap.data() as UserDetails)
						console.log(docSnap.data())
					} else {
						console.log('No such document!')
					}
				} catch (error) {
					console.error('Error fetching user data:', error)
				}
			} else {
				navigate('/authorization')
			}
		})
	}

	useEffect(() => {
		fetchUserData()
	}, [])

	const handleLogout = async () => {
		try {
			await auth.signOut()
			navigate('/authorization')
		} catch (error) {
			console.error('Error during logout:', error)
		}
	}

	return (
		<Sidebar>
			<div className='p-6'>
				{userDetails && (
					<div>
						<div>{userDetails.email}</div>
						<button onClick={() => handleLogout()}>Logout</button>
					</div>
				)}
				<div className='flex flex-wrap gap-6'>
					<div
						className='relative bg-muted w-72 h-44 rounded-xl flex justify-center items-center cursor-pointer hover:bg-primary-foreground transition-all duration-300'
						onClick={() => navigate('/addNewStory')}
					>
						<span className='text-6xl text-center text-foreground'>+</span>
					</div>
					<div
						className='relative bg-muted w-72 h-44 rounded-xl px-4 py-2 flex flex-col gap-4 cursor-pointer'
						onClick={() => navigate('/story/1')}
					>
						<h5 className='font-semibold'>Title of day</h5>
						<span className='absolute right-4 top-0 text-2xl'>&#x263A;</span>
						<p className='text-sm'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab,
							natus iusto in repellendus cumque aperiam ad. Id est numquam quod.
						</p>
						<span className='text-xs font-semibold'>02-01-2025</span>
					</div>
				</div>
			</div>
		</Sidebar>
	)
}
