import Spinner from '@/components/Spinner'
import { useAuth } from '@/context/AuthContext'
import { trpc } from '@/utils/trpc'
import React from 'react'
import TrendsRow from './trends-row'

interface TrendsProps {}

const Trends: React.FC<TrendsProps> = ({}) => {
	const { currentUser } = useAuth()
	const { data: trends, isLoading } = trpc.useQuery(['trends.getTopTrends'])

	if (!currentUser && isLoading)
		return (
			<div className="flex justify-center">
				<Spinner />
			</div>
		)
	if (trends?.trends?.length === 0 || isLoading) return null

	return (
		<div className="overflow-x-hidden rounded-2xl bg-bg-grayed">
			<h2 className="py-3 px-4 text-xl font-extrabold">Current trends</h2>

			{trends?.trends.map((trend) => (
				<TrendsRow trend={trend} key={trend.id} />
			))}
		</div>
	)
}

export default Trends
