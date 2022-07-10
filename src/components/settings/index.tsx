import React from 'react'
import ThemeButtonWrapper from './ThemeButtonWrapper'
import Account from './Account'
import Accent from './Accent'
import About from './About'

const Settings: React.FC = () => {
	return (
		<div>
			<Accent />
			<ThemeButtonWrapper />
			<Account />
			<About />
		</div>
	)
}

export default Settings
