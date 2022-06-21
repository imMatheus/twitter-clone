import React from 'react'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'

const UserNotFoundBanner: React.FC = ({}) => {
	return (
		<div className="p-4">
			<div className="flex items-center gap-6">
				<Link href="/" passHref>
					<a>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-colors hover:bg-border">
							<ArrowLeft className="text-text" />
						</div>
					</a>
				</Link>
			</div>
			<h1 className="text-center text-2xl font-bold">User not found</h1>
		</div>
	)
}

export default UserNotFoundBanner
