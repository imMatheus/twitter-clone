import { trpc } from '@/utils/trpc'
import Image from 'next/image'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import type { inferQueryResponse } from '@/utils/inferQueryResponse'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'

interface RoomRowProps {
	room: inferQueryResponse<'messages.getRooms'>['rooms'][number]
}

const RoomRow: React.FC<RoomRowProps> = ({ room }) => {
	const { currentUser } = useAuth()
	const router = useRouter()
	const { roomId } = router.query
	const isActive = room.id === roomId

	if (!room.members[0]) return null
	return (
		<Link href={`/messages/${room.id}`} passHref>
			<a
				className={classNames('flex gap-3 overflow-hidden p-4 transition-colors hover:bg-text/10', {
					'bg-text/10': isActive
				})}
			>
				<div className="relative h-12 w-12 flex-shrink-0">
					<Image src={room.members[0].image} alt="ss" className="rounded-full" layout="fill" />
				</div>
				<div className="relative m-0 flex min-w-0 flex-shrink-0 flex-grow basis-0 flex-col items-stretch">
					<div className="flex min-w-0 basis-auto items-stretch">
						<div className="flex min-w-0 flex-1 flex-col items-stretch text-text-grayed">
							<div className="flex min-w-0 max-w-full flex-shrink items-center gap-1 pr-5 text-sm">
								<div className="flex min-w-0 gap-1 truncate">
									<p className="text font-medium text-text">{room.members[0].name}</p>
									<p className="truncate font-normal">@{room.members[0].handle}</p>
								</div>
								<div className="flex-shrink-0">·</div>
								<div className="flex-shrink-0">Jun 27</div>
							</div>

							<div className="min-w-0 overflow-hidden pr-5">
								<div className="min-w-0 max-w-full truncate break-words">
									<span className={classNames('min-w-0 break-words', { 'text-text': isActive })}>
										{room.messages[0]?.text}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		</Link>
	)
}

export default RoomRow
