import { inferQueryResponse } from '@/utils/inferQueryResponse'
import Link from 'next/link'
import React from 'react'

interface TrendsRowProps {
	trend: inferQueryResponse<'trends.getTopTrends'>['trends'][number]
}

const TrendsRow: React.FC<TrendsRowProps> = ({ trend }) => {
	return (
		<article className="cursor-pointer transition-colors hover:bg-text/[0.03]">
			<Link href={`/explore/hashtags?q=${'%23' + trend.name}`} passHref>
				<div className="flex items-center gap-3 px-4 py-3">
					<div className="w-full flex-1">
						<div className="flex items-center justify-between">
							<div className="flex flex-col">
								<p className="text-xs text-text-grayed">Trending</p>
								<h3 className="font-bold">#{trend.name}</h3>
								<p className="text-sm text-text-grayed">{trend.numberOfTweets} Tweets</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</article>
	)
}

export default TrendsRow
