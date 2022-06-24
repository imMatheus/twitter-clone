import React from 'react'
import type { Icon as IconType } from 'react-feather'

interface PopupRowProps {
	Icon: IconType
	children: React.ReactNode
}

const PopupRow: React.FC<PopupRowProps> = ({ Icon, children }) => {
	return (
		<li className="flex gap-3 p-4 transition-colors hover:bg-text/[0.03]">
			<Icon className="h-5 w-5" />
			<p className="font-normal text-text">{children}</p>
		</li>
	)
}

export default PopupRow
