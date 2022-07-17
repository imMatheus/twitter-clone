import { unCastArray } from '@/utils/unCastArray'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import React, { useState, useId, useEffect } from 'react'
import { Search, X } from 'react-feather'

interface SearchBarProps {
	base: string
}

const SearchBar: React.FC<SearchBarProps> = ({ base }) => {
	const router = useRouter()
	const id = useId()
	const { q } = router.query

	const [text, setText] = useState(q || '')

	useEffect(() => {
		setText(unCastArray(q))
	}, [q])

	return (
		<form
			action="#"
			aria-label="Search"
			role="search"
			onSubmit={(e) => {
				e.preventDefault()

				router.push({
					pathname: base,
					query: {
						q: text
					}
				})
			}}
			className="group w-full rounded-full border border-transparent bg-bg-grayed-dark focus-within:border-accent focus-within:bg-bg focus-within:text-accent"
		>
			<label htmlFor={id} className="relative flex w-full flex-1 items-center">
				<Search className="ml-3 h-5 w-5 flex-shrink-0 text-text-grayed group-focus-within:text-accent" />
				<input
					className="w-full bg-transparent p-3 pr-6 !outline-none"
					type="text"
					name="search-input"
					id={id}
					value={text}
					placeholder="Search Twitter..."
					onChange={(e) => setText(e.target.value)}
				/>
				<div
					onClick={(e) => {
						setText('')
					}}
					className="absolute right-3 hidden h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent text-white active:flex group-focus-within:flex"
				>
					<X className="h-4 w-4" />
				</div>
			</label>
		</form>
	)
}

export default SearchBar
