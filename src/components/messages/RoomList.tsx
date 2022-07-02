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
		<div className="relative flex h-screen flex-col">
			<NavContainer className="justify-between">
				{/* <div className=""> */}
				<h3 className="text-lg font-bold">Messages</h3>
				<div className="flex flex-shrink-0">
					<IconButton Icon={Settings} onClick={() => {}} />
					<IconButton Icon={Mail} onClick={() => {}} />
					{/* </div> */}
				</div>
			</NavContainer>

			{(!data || isLoading) && (
				<div className="flex justify-center">
					<Spinner />
				</div>
			)}

			<div className="flex-1 overflow-y-scroll">
				{data?.rooms.map((room) => {
					return (
						<>
							<RoomRow key={room.id} room={room} />
						</>
					)
				})}
			</div>
		</div>
	)
}

export default RoomList
