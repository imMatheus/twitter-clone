import { trpc } from '@/utils/trpc'
import React from 'react'
import { Settings, Mail } from 'react-feather'
import IconButton from '@/components/IconButton'
import RoomRow from './RoomRow'

interface RoomListProps {}

const RoomList: React.FC<RoomListProps> = ({}) => {
	const { data } = trpc.useQuery(['messages.getRooms'])
	return (
		<div className="">
			<div className="sticky top-0 flex items-center justify-between p-4">
				<h3 className="text-lg font-bold">Messages</h3>
				<div className="flex flex-shrink-0">
					<IconButton Icon={Settings} onClick={() => {}} />
					<IconButton Icon={Mail} onClick={() => {}} />
				</div>
			</div>
			{JSON.stringify(data) || 'hej'}
			<RoomRow />
			<RoomRow />
			<RoomRow />
			<RoomRow />
		</div>
	)
}

export default RoomList
