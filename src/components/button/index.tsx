import React from 'react'
import styles from './button.module.scss'

interface ButtonProps {
	children: React.ReactNode
	variant: 'light' | 'dark' | 'theme'
	onClick: () => void
	loading: boolean
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, loading }) => {
	return (
		<button className={styles[variant]} onClick={onClick} disabled={loading}>
			{children}
		</button>
	)
}

export default Button
