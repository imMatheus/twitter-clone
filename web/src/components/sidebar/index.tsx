import React from 'react'
import styles from './sidebar.module.scss'
import { Twitter, Home, Hash, Bell, Mail, User, Settings } from 'react-feather'
import Row from './Row'
import Image from 'next/image'
import Link from 'next/link'
// import {ReactComponent} from ''

const Sidebar: React.FC = ({}) => {
	return (
		<section className={styles.sidebar}>
			<ul className={styles.sidebar__list}>
				<Row src="/twitter.svg" href="/" />
				<Row Icon={Home} text="Home" href="/" />
				<Row Icon={Hash} text="Explore" href="/" />
				<Row Icon={Bell} text="Notifications" href="/" />
				<Row Icon={Mail} text="Messages" href="/" />
				<Row Icon={User} text="Profile" href="/users/yonny" />
				<Row Icon={Settings} text="Settings" href="/settings" />
			</ul>
			<button className="block w-full rounded-full bg-accent px-4 py-3 text-lg font-bold text-white transition-opacity hover:opacity-80">
				Tweet
			</button>
			<Link href="/users/abc" passHref>
				<a className="!mt-auto block">
					<div className="flex cursor-pointer items-center rounded-full p-3 transition-colors hover:bg-bg-grayed-dark">
						<div className="relative mr-2 h-10 w-10 flex-shrink-0 rounded-full bg-white">
							<Image
								src="https://avatars.dicebear.com/api/identicon/sarre.svg"
								alt="user avatar"
								width={40}
								height={40}
								layout="fill"
								className="rounded-full"
							/>
						</div>
						<div className="overflow-hidden">
							<h3 className="truncate font-bold">Matheus mendes barata de almeida</h3>
							<p className="font-normal text-text-grayed">@matumatu</p>
						</div>
					</div>
				</a>
			</Link>
		</section>
	)
}

export default Sidebar
