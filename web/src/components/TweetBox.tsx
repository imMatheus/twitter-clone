import React, { useState } from 'react'
import ProfileImage from '@/components/ProfileImage'
import { User as IUser } from '@/types/User'
import { useSWR } from '@/hooks/useSWR'
import styles from 'styles/TweetBox.module.scss'

interface TweetBoxProps {}

const TweetBox: React.FC<TweetBoxProps> = ({}) => {
	const [user, error, isLoading] = useSWR<IUser>('/users/yonny')
	const [text, setText] = useState('')

	return (
		<>
			<div className="flex gap-4 border-b border-b-border p-4">
				<div className="flex-shrink-0">
					{user ? <ProfileImage user={user} /> : <div className="h-12 w-12"></div>}
				</div>
				<div className="w-full bg-red-800">
					{/* <form className="w-full bg-blue-700"> */}
					{/* <span
						className="block bg-blue-700"
						onInput={() => alert('bbbb')}
						role="textbox"
						contentEditable
						onChange={() => alert('hej')}
					>
						hej
					</span> */}
					{/* <div className={styles.box}>
					<textarea
						data-value={text}
						// className="w-full resize-none bg-green-700 bg-transparent text-xl font-normal outline-none placeholder:text-text-grayed"
						value={text}
						rows={1}
						// cols={1}
						placeholder="What's happening?"
						onChange={(e) => setText(e.target.value)}
					/>
				</div> */}
					{/* </form> */}
					<button
						className="ml-auto min-h-[2.25rem] rounded-full bg-theme px-4 disabled:opacity-50"
						disabled={!text}
					>
						Tweet
					</button>
				</div>
			</div>
			<label className={styles.box}>
				<textarea
					data-value={text}
					// className="w-full resize-none bg-green-700 bg-transparent text-xl font-normal outline-none placeholder:text-text-grayed"
					value={text}
					// rows={1}
					// cols={1}
					placeholder="What's happening?"
					onChange={(e) => setText(e.target.value)}
				/>
			</label>
		</>
	)
}

export default TweetBox
