import React from 'react'

interface TweetsContainerProps {
    children: React.ReactNode
}

const TweetsContainer: React.FC<TweetsContainerProps> = ({ children }) => {
    return <div className='divide-y divide-border'>{children}</div>
}

export default TweetsContainer
