import React from 'react'
import styles from './layout.module.scss'

interface FocusedLayoutProps {
	children: React.ReactNode
}

const FocusedLayout: React.FC<FocusedLayoutProps> = ({ children }) => {
	return <div className={styles['focused-layout']}>{children}</div>
}

export default FocusedLayout
