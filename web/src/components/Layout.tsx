import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='bg-gray-800 w-screen p-4'>
            <div className='bg-gray-900'>{children}</div>
        </div>
    )
}

export default Layout
