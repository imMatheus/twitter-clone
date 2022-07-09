import React, { useId, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import classNames from 'classnames'
import { Check } from 'react-feather'

interface CheckBoxProps {
	onClick: (checked: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({ onClick }) => {
	const id = useId()
	const { currentUser } = useAuth()
	const [checked, setChecked] = useState(currentUser?.privacy === 'PRIVATE')
	return (
		<label
			htmlFor={id}
			className={classNames(
				'cursor-pointer rounded-full p-3',
				checked ? 'hover:bg-accent/10' : 'hover:bg-text-grayed/10'
			)}
		>
			<div
				className={classNames(
					'flex h-5 w-5 items-center justify-center rounded border-2',
					checked ? 'border-accent bg-accent' : 'border-text-grayed'
				)}
			>
				{checked && <Check className="text-white" />}
			</div>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={() => {
					onClick(!checked)
					setChecked((c) => !c)
				}}
				className="hidden"
				name="privacy-checkbox"
			/>
		</label>
	)
}

export default CheckBox
