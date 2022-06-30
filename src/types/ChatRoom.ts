import { inferQueryResponse } from '@/utils/inferQueryResponse'

export type ChatRoom = Exclude<inferQueryResponse<'messages.getRoomById'>['chatRoom'], null>
export type ChatRoomMember = ChatRoom['members'][number]
export type ChatRoomMessage = ChatRoom['messages'][number]
