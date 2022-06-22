import React from 'react'
import styles from './sidebar.module.scss'
import { Twitter, Home, Hash, Bell, Mail, User, Settings, Feather } from 'react-feather'
import Row from './Row'
import Image from 'next/image'
import Link from 'next/link'
// import {ReactComponent} from ''
import { useAuth } from '@/context/AuthContext'

const Sidebar: React.FC = ({}) => {
	const { currentUser } = useAuth()

	return (
		<section className={styles.sidebar}>
			<ul className={styles.sidebar__list}>
				<Row src="/twitter.svg" href="/" />
				<Row Icon={Home} text="Home" href="/" />
				<Row Icon={Hash} text="Explore" href="/" />
				<Row Icon={Bell} text="Notifications" href="/" />
				<Row Icon={Mail} text="Messages" href="/messages" />
				<Row Icon={User} text="Profile" href="/users/yonny" />
				<Row Icon={Settings} text="Settings" href="/settings" />
			</ul>
			<button className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white transition-opacity hover:opacity-80 lg:w-full lg:px-4 lg:py-3">
				<Feather className="block h-6 w-6 lg:hidden" /> <span className="hidden lg:block">Tweet</span>
			</button>
			{currentUser && (
				<Link href={`/users/${currentUser.handle}`} passHref>
					<a className="!mt-auto block">
						<div className="flex cursor-pointer items-center rounded-full p-3 transition-colors hover:bg-bg-grayed-dark">
							<div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-white lg:mr-2">
								<Image
									src={currentUser.image}
									alt={`${currentUser.name} profile image`}
									layout="fill"
									className="rounded-full"
								/>
							</div>
							<div className="overflow-hidden">
								<h3 className="hidden truncate font-bold lg:block">{currentUser.name}</h3>
								<p className="hidden font-normal text-text-grayed lg:block">@{currentUser.handle}</p>
							</div>
						</div>
					</a>
				</Link>
			)}
		</section>
	)
}

export default Sidebar
