import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'

export interface OptionProps {
	text: React.ReactNode
	href: string
}

const Option: React.FC<OptionProps> = ({ text, href }) => {
	const router = useRouter()

	const isActive = router.asPath === href
	return (
		<Link href={href} passHref>
			<a className="relative flex flex-shrink-0 grow items-center justify-center px-4 font-medium transition-colors hover:bg-bg-grayed-dark">
				<div
					className={classNames(
						'relative flex h-14 items-center',
						isActive ? 'text-text' : 'text-text-grayed'
					)}
				>
					{text}
					{isActive && (
						<div className="absolute bottom-0 left-1/2 h-1 w-full min-w-[2.5rem] -translate-x-1/2 rounded-md bg-accent"></div>
					)}
				</div>
			</a>
		</Link>
	)
}

export default Option
