import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'

export interface OptionProps {
	text: React.ReactNode
	href: string
	handle: string
}

const Option: React.FC<OptionProps> = ({ text, href, handle }) => {
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
					{text}
					{isActive && <div className="absolute bottom-0 left-0 right-0 h-1 rounded-md bg-accent"></div>}
				</div>
			</a>
		</Link>
	)
}

export default Option