import { TStory } from '@/types/storyTypes'
import { createContext, useContext, useState } from 'react'

interface StoryContextValue {
	story: TStory
	setCurrentStory: (newStory: Partial<TStory>) => void
}

const StoryContext = createContext<StoryContextValue | undefined>(undefined)

export const useStory = () => {
	const context = useContext(StoryContext)
	if (!context) {
		throw new Error('useStory must be used within a StoryProvider')
	}
	return context
}

export const StoryProvider = ({ children }: { children: React.ReactNode }) => {
	const [story, setStory] = useState<TStory>({} as TStory)

	const setCurrentStory = (newStory: Partial<TStory>) => {
		setStory(prevStory => ({ ...prevStory, ...newStory }))
	}

	const value: StoryContextValue = {
		story,
		setCurrentStory,
	}

	return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}
