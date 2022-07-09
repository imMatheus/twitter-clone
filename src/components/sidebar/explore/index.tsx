import React from 'react'
import UserSuggestions from './user-suggestions'

interface ExploreSidebarProps {}

const ExploreSidebar: React.FC<ExploreSidebarProps> = ({}) => {
	return (
		<div className="sticky top-0 h-screen overflow-y-scroll py-4 pl-8 lg:w-96">
			<div className="flex h-full flex-col overflow-y-scroll">
				<div className="flex-shrink-0">
					<UserSuggestions />
				</div>

				<div className="mt-auto pt-2 text-xs text-text-grayed">© 2022 Matheus Mendes.</div>
			</div>
		</div>
	)
}

export default ExploreSidebar
