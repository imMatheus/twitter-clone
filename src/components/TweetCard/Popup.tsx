import React from 'react'
import PopupRow from './PopupRow'
import { useClickOutside } from '@mantine/hooks'
import { UserPlus } from 'react-feather'

interface PopupProps {
	toggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup: React.FC<PopupProps> = ({ toggle }) => {
	const ref = useClickOutside(() => toggle(false))

	return (
		<ul ref={ref} className="absolute top-0 right-0 z-50 w-max max-w-sm rounded-md bg-bg shadow-xl">
			<PopupRow Icon={UserPlus}>Not interested in this Tweet</PopupRow>
			<PopupRow Icon={UserPlus}>Follow@kylegawley</PopupRow>
			<PopupRow Icon={UserPlus}>Add/remove @kylegawley from Lists</PopupRow>
			<PopupRow Icon={UserPlus}>Mute @kylegawley</PopupRow>
			<PopupRow Icon={UserPlus}>Block @kylegawley</PopupRow>
			<PopupRow Icon={UserPlus}>Embed Tweet</PopupRow>
			<PopupRow Icon={UserPlus}>Report Tweet</PopupRow>
		</ul>
	)
}

export default Popup
