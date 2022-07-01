import React from 'react'
import type { NextPage } from 'next'
import Button from '@/components/button'

const Messages: NextPage = () => {
	return (
		<div className="flex h-screen items-center justify-center px-6 py-10">
			<div className="max-w-sm">
				<h2 className="mb-2 text-3xl font-extrabold">Select a message</h2>
				<p className="mb-6 text-text-grayed">
					Choose from your existing conversations, start a new one, or just keep swimming.
				</p>
				<Button variant="theme" size="large" onClick={() => {}}>
					New message
				</Button>
			</div>
		</div>
	)
}

export default Messages
