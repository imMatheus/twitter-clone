import { trpc } from '@/utils/trpc'
import React from 'react'
import { Settings, Mail } from 'react-feather'
import IconButton from '@/components/IconButton'
import RoomRow from './RoomRow'
import Spinner from '@/components/Spinner'
import NavContainer from '@/components/container/nav'

interface RoomListProps {}

const RoomList: React.FC<RoomListProps> = ({}) => {
	const { data, isLoading } = trpc.useQuery(['messages.getRooms'])
	return (
		<div className="relative">
			<div className="relative flex h-screen flex-col">
				<div className="absolute left-0 right-0 top-0">
					<NavContainer className="justify-between">
						<h3 className="text-lg font-bold">Messages</h3>
						<div className="flex flex-shrink-0">
							<IconButton Icon={Settings} onClick={() => {}} />
							<IconButton Icon={Mail} onClick={() => {}} />
						</div>
					</NavContainer>
				</div>

				<div className="pt-14"></div>
				{(!data || isLoading) && (
					<div className="flex flex-1 items-center justify-center">
						<Spinner />
					</div>
				)}

				<div className="flex-1 overflow-y-scroll">
					{data?.rooms.map((room) => (
						<RoomRow key={room.id} room={room} />
					))}
				</div>
			</div>
		</div>
	)
}

export default RoomList
