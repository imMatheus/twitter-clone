import React from 'react'

interface TweetsContainerProps {
    children: React.ReactNode
}

const TweetsContainer: React.FC<TweetsContainerProps> = ({ children }) => {
    return <div className='divide-y divide-white/30'>{children}</div>
}

export default TweetsContainer
