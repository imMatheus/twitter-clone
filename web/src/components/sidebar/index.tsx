import React from 'react'
import styles from './sidebar.module.scss'
import { Twitter, Home, Hash, Bell, Mail, User, Settings } from 'react-feather'
import Row from './Row'

const Sidebar: React.FC = ({}) => {
	return (
		<ul className={styles.sidebar}>
			<Row Icon={Twitter} href="/" />
			<Row Icon={Home} text="Home" href="/" />
			<Row Icon={Hash} text="Explore" href="/" />
			<Row Icon={Bell} text="Notifications" href="/" />
			<Row Icon={Mail} text="Messages" href="/" />
			<Row Icon={User} text="Profile" href="/users/yonny" />
			<Row Icon={Settings} text="Settings" href="/settings" />
		</ul>
	)
}

export default Sidebar
