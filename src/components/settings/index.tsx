import React from 'react'
import ColorPicker from './ColorPicker'
import ThemeButtonWrapper from './ThemeButtonWrapper'
import Header from './Header'
import Account from './Account'
import Accent from './Accent'

const Settings: React.FC = () => {
	return (
		<div>
			<Accent />
			<ThemeButtonWrapper />
			<Account />
		</div>
	)
}

export default Settings
