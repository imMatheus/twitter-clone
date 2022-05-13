import React from 'react'
import type { Icon as IconType } from 'react-feather'
import styles from './sidebar.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface RowProps {
	Icon: IconType
	text?: string
	href: string
}

const Row: React.FC<RowProps> = ({ Icon, text, href }) => {
	const router = useRouter()

	const isActive = router.pathname === href

	return (
		<Link href={href} passHref>
			<a>
				<li className={isActive ? styles.sidebar__list__row__selected : styles.sidebar__list__row}>
					<Icon className={styles.sidebar__list__icon} strokeWidth={isActive ? '2.5px' : '2px'} />
					{text && <p>{text}</p>}
				</li>
			</a>
		</Link>
	)
}

export default Row
