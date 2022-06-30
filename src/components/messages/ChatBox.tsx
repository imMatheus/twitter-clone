import React, { useId } from 'react'
import { Textarea } from '@mantine/core'
import IconButton from '@/components/IconButton'
import { Send } from 'react-feather'

interface ChatBoxProps {}

const ChatBox: React.FC<ChatBoxProps> = ({}) => {
	const formId = useId()
	return (
		<form
			onSubmit={(e) => {
				console.log('gggg')
				console.log(e)
			}}
			id={formId}
			className="flex items-center gap-1 border-t border-t-border p-3"
		>
			<div className="flex-1 rounded-3xl bg-bg p-1 outline outline-1 outline-text/25 focus-within:outline-2 focus-within:outline-accent">
				<div className="relative max-h-44 min-w-0 overflow-y-scroll [&_textarea]:!p-0 [&_textarea]:!py-2">
					<Textarea
						placeholder="Autosize with no rows limit"
						autosize
						variant="unstyled"
						minRows={1}
						className="px-2"
						form={formId}
						// classNames="bg-blue-500"
						style={{
							overflow: 'scroll',
							padding: '0px !important'
						}}
					/>
				</div>
			</div>
			<IconButton Icon={Send} accentThemed />
		</form>
	)
}

export default ChatBox
