import React from 'react'

interface NavProps {
	children: React.ReactNode
}

const Nav: React.FC<NavProps> = ({ children }) => {
	return (
		<div className="sticky top-0 z-50 h-14">
			<div className="absolute inset-0 bg-bg opacity-80"></div>
			<div className="absolute inset-0 backdrop-blur-md"></div>
			<div className="relative z-50 flex h-full items-center gap-6 px-4 py-2">{children}</div>
		</div>
	)
}

export default Nav
