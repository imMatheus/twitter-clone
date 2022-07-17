import React from 'react'
import Trends from './trends'
import UserSuggestions from './user-suggestions'
import { useAuth } from '@/context/AuthContext'

interface ExploreSidebarProps {}

const ExploreSidebar: React.FC<ExploreSidebarProps> = ({}) => {
	const { currentUser } = useAuth()

	return (
		<div className="sticky top-0 h-screen overflow-y-scroll pl-8 lg:w-96">
			<div className="flex h-full flex-col gap-4 overflow-y-scroll py-4">
				{currentUser && (
					<div className="flex-shrink-0">
						<UserSuggestions />
					</div>
				)}
				<div className="flex-shrink-0">
					<Trends />
				</div>

				<div className="mt-auto pt-2 text-xs text-text-grayed">© 2022 Matheus Mendes.</div>
			</div>
		</div>
	)
}

export default ExploreSidebar
