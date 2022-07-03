import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'

interface SectionPickerProps {
	handle: string
}

const SectionPicker: React.FC<SectionPickerProps> = ({ handle }) => {
	return (
		<div className="flex w-full min-w-0 gap-1 overflow-x-scroll border-b border-b-border">
			<Option handle={handle} href="">
				Tweets
			</Option>
			<Option handle={handle} href="/with_replies">
				Tweets & replies
			</Option>
			<Option handle={handle} href="/likes">
				Likes
			</Option>
		</div>
	)
}

interface OptionProps {
	children: React.ReactNode
	href: string
	handle: string
}

const Option: React.FC<OptionProps> = ({ children, href, handle }) => {
	const router = useRouter()
	const fullHref = `/users/${handle}${href}`
	const isActive = router.asPath === fullHref
	return (
		<Link href={fullHref} passHref>
			<a className="relative flex flex-shrink-0 grow items-center justify-center px-4 font-medium transition-colors hover:bg-bg-grayed-dark">
				<div
					className={classNames(
						'relative flex h-14 items-center',
						isActive ? 'text-text' : 'text-text-grayed'
					)}
				>
					{children}
					{isActive && <div className="absolute bottom-0 left-0 right-0 h-1 rounded-md bg-accent"></div>}
				</div>
			</a>
		</Link>
	)
}

export default SectionPicker
