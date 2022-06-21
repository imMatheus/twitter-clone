import React from 'react'
import styles from './LengthCircleTracker.module.scss'

interface LengthCircleTrackerProps {
	text: string
	MAX_TEXT_LENGTH: number
}

const LengthCircleTracker: React.FC<LengthCircleTrackerProps> = ({ text, MAX_TEXT_LENGTH }) => {
	const lettersLeft = MAX_TEXT_LENGTH - text.length
	const smallCircle = Math.floor(lettersLeft) > 20
	const textLengthHasSurpassedMax = lettersLeft < 1

	if (text.length < 1) return <></>

	return lettersLeft > -99 ? (
		<div
			className="flex h-[30px] w-[30px] items-center justify-center"
			style={{ color: textLengthHasSurpassedMax ? 'var(--danger-color)' : 'inherit' }}
		>
			<div
				className="relative flex items-center justify-center transition-all"
				style={{ width: smallCircle ? '20px' : '100%', height: smallCircle ? '20px' : '100%' }}
			>
				<svg
					viewBox="0 0 125 125"
					className="absolute top-1/2 left-1/2 h-full w-full -translate-y-1/2 -translate-x-1/2 -rotate-90"
					strokeLinecap="round"
				>
					<circle r="56" cx="50%" cy="50%" strokeWidth={10} fill="none" stroke="var(--border)"></circle>
					<circle
						className={styles.circle}
						r="56"
						fill="none"
						cx="50%"
						cy="50%"
						stroke={textLengthHasSurpassedMax ? 'var(--danger-color)' : 'var(--accent-color)'}
						strokeWidth={10}
						strokeDasharray={`${(348 * text.length) / MAX_TEXT_LENGTH}, 348`}
					></circle>
				</svg>
				{!smallCircle && <p className="text-xs">{lettersLeft}</p>}
			</div>
		</div>
	) : (
		<p className="text-xs text-danger">{lettersLeft}</p>
	)
}

export default LengthCircleTracker
