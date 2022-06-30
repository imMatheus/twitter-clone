import React from 'react'
import type { Icon as IconType } from 'react-feather'
import classNames from 'classnames'

interface IconButtonProps {
	Icon: IconType
	onClick?: () => void
	accentThemed?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, accentThemed, onClick }) => {
	return (
		<div
			className={classNames(
				'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
				{ 'cursor-pointer': onClick },
				{ 'hover:bg-text/10': !accentThemed },
				{ 'text-accent hover:bg-accent/10 ': accentThemed }
			)}
			onClick={onClick}
		>
			<Icon className="h-5 w-5" />
		</div>
	)
}

export default IconButton
