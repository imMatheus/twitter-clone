import React, { useState } from 'react'
import { Search, X } from 'react-feather'

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
	const [text, setText] = useState('')
	return (
		<form
			action="#"
			aria-label="Search"
			role="search"
			className="group w-full rounded-full border border-transparent bg-bg-grayed-dark focus-within:border-accent focus-within:bg-bg focus-within:text-accent"
		>
			<label htmlFor="search-input" className="flex w-full flex-1 items-center">
				<Search className="ml-3 h-5 w-5 flex-shrink-0 text-text-grayed group-focus-within:text-accent" />
				<input
					className="w-full bg-transparent p-3 !outline-none"
					type="text"
					name="search-input"
					id="search-input"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div
					onClick={(e) => {
						e.preventDefault()
						// e.stopPropagation()
						setText('')
					}}
					className="mr-3 hidden h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent text-white group-focus-within:flex"
				>
					<X className="h-4 w-4" />
				</div>
			</label>
		</form>
	)
}

export default SearchBar
