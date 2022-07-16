import React from 'react'
import styles from './button.module.scss'
import classNames from 'classnames'
interface ButtonProps {
	children: React.ReactNode
	variant: 'light' | 'dark' | 'theme'
	size?: 'small' | 'medium' | 'large'
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	loading?: boolean
	disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, variant, size = 'medium', onClick, disabled, loading }) => {
	return (
		<button
			className={classNames(styles['button'], styles[variant], styles[size])}
			onClick={onClick}
			disabled={loading || disabled}
		>
			{children}
		</button>
	)
}

export default Button
