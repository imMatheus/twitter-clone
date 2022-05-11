import React from 'react'
import styles from './layout.module.scss'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return <div className={styles.layout}>{children}</div>
}

export default Layout
