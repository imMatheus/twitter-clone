import React, { useState, useId } from 'react'
import classNames from 'classnames'

interface InputProps {
	value: string
	onChange: React.Dispatch<React.SetStateAction<string>>
	label: string
	maxLength: number
	required?: boolean
}

const Input: React.FC<InputProps> = ({ value, onChange, label, maxLength, required }) => {
	const textEmpty = value.length < 1
	const invalidText = required && textEmpty
	const inputId = useId()
	return (
		<div className="my-6">
			<label
				htmlFor={inputId}
				className={classNames(
					'group relative block rounded border border-text/20 p-2 focus-within:border-accent',
					invalidText && '!border-danger'
				)}
			>
				<div className="flex justify-between text-sm text-text-grayed">
					<div>
						<div
							className={classNames(
								textEmpty &&
									'absolute translate-y-[calc(50%_-_4px)] text-lg group-focus-within:translate-y-0 group-focus-within:text-sm',
								'transition-all group-focus-within:text-accent',
								invalidText && 'group-focus-within:text-danger'
							)}
						>
							{label}
						</div>
					</div>
					<div className="invisible group-focus-within:visible">
						{value.length}/{maxLength}
					</div>
				</div>
				<div className={classNames(textEmpty && 'opacity-0', 'group-focus-within:opacity-100')}>
					<input
						id={inputId}
						name={label}
						type="text"
						value={value}
						className="w-full bg-transparent text-lg text-text outline-none"
						onChange={(e) => onChange(e.target.value.length > maxLength ? value : e.target.value)}
					/>
				</div>
			</label>
			{invalidText && <p className="pl-2 text-xs text-danger">This field can not be empty</p>}
		</div>
	)
}

export default Input
