import React from 'react'
import Link from 'next/link'
import ProfileImage from '@/components/ProfileImage'

interface TweetScreenProps {}

const TweetScreen: React.FC<TweetScreenProps> = ({}) => {
	return (
		<div>
			<div className="flex flex-col gap-4 p-4">
				<div className="flex gap-2">
					{/* <ProfileImage user={} /> */}
					<div className="h-12 w-12 rounded-full bg-green-400"></div>

					<div className="w-full flex-1">
						<div className="flex flex-col">
							<Link href={`/users/abc`} passHref>
								<a className="cursor-pointer">
									<h2 className="font-bold">William R</h2>
								</a>
							</Link>
							<h3 className="text-text-grayed">@wille</h3>
						</div>
					</div>
				</div>
				<p className="text-xl font-medium md:text-xl">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure commodi labore cupiditate rerum
					perferendis quibusdam deserunt ullam porro explicabo pariatur.
				</p>
				<div className="flex text-text-grayed">
					<p>12:53 AM</p> <div className="h-[1px] w-[1px] flex-shrink-0 rounded-full bg-bg-grayed"></div>
					<p>May 12, 2021</p>
				</div>
			</div>
		</div>
	)
}

export default TweetScreen
