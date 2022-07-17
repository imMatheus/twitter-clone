import React from 'react'
import type { Icon as IconType } from 'react-feather'
import styles from './sidebar.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

type RowProps = {
	href: string
	Icon?: IconType
	text?: string
	src?: string
}

const Row: React.FC<RowProps> = ({ Icon, text, src, href }) => {
	const router = useRouter()

	const isActive = router.asPath === href || (router.asPath.startsWith(href) && href !== '/')

	return (
		<li className={styles.sidebar__list}>
			<Link href={href} passHref>
				<a className={isActive ? styles.sidebar__list__row__selected : styles.sidebar__list__row}>
					{Icon ? (
						<Icon className={styles.sidebar__list__icon} strokeWidth={isActive ? '2.5px' : '2px'} />
					) : src ? (
						<Image src={src} alt="twitter logo" objectFit="contain" width={40} height={40} />
					) : (
						<></>
					)}
					{text && <p className="hidden lg:block">{text}</p>}
				</a>
			</Link>
		</li>
	)
}

export default Row
