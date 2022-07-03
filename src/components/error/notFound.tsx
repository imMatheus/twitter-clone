import React from 'react'
import HeaderBox from '@/components/HeaderBox'

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = ({}) => {
	return (
		<>
			<HeaderBox goBack goBackHref="/" title={'User not found'} />
			<h2 className="text-center text-base text-text-grayed">
				Hmm...this page doesn’t exist. Try searching for something else.
			</h2>
		</>
	)
}

export default NotFound
