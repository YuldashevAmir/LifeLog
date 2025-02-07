import { FC } from 'react'
import { Input } from './ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

interface IStoryFiltersProps {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	selectedPeriod: '7' | '30' | 'all'
	setSelectedPeriod: React.Dispatch<React.SetStateAction<'7' | '30' | 'all'>>
}

export const StoryFilters: FC<IStoryFiltersProps> = ({
	search,
	setSearch,
	selectedPeriod,
	setSelectedPeriod,
}) => {
	return (
		<div className='flex gap-6'>
			<Select
				value={selectedPeriod}
				onValueChange={value => setSelectedPeriod(value as '7' | '30' | 'all')}
			>
				<SelectTrigger className='w-72'>
					<SelectValue placeholder='Period' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>All</SelectItem>
					<SelectItem value='7'>7 - days</SelectItem>
					<SelectItem value='30'>30 - days</SelectItem>
				</SelectContent>
			</Select>
			<Input
				className='w-72'
				placeholder='Search'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
		</div>
	)
}
