import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAbGiRLaN48qxWYqT8MwDuKGc2wogjZYzE',
	authDomain: 'lifelog-bca27.firebaseapp.com',
	projectId: 'lifelog-bca27',
	storageBucket: 'lifelog-bca27.firebasestorage.app',
	messagingSenderId: '607334047203',
	appId: '1:607334047203:web:d913016a2ec05ad45394d6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
