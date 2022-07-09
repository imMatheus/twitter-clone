import React from 'react'

interface HeaderProps {
	text: string
}

const Header: React.FC<HeaderProps> = ({ text }) => {
	return <h2 className="mb-3 text-2xl font-bold">{text}</h2>
}

export default Header
