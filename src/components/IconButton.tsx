import React from 'react'
import type { Icon as IconType } from 'react-feather'
import classNames from 'classnames'

interface IconButtonProps {
	Icon: IconType
	onClick?: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, onClick }) => {
	return (
		<div
			className={classNames(
				'flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-text/10',
				{ 'cursor-pointer': onClick }
			)}
			onClick={onClick}
		>
			<Icon className="h-5 w-5" />
		</div>
	)
}

export default IconButton
