import React from 'react'
import { ArrowLeft, MoreHorizontal } from 'react-feather'
import Link from 'next/link'

interface HeaderBoxProps {
	goBack?: boolean
	title: string
	subtitle?: string | number
}

const HeaderBox: React.FC<HeaderBoxProps> = ({ goBack, title, subtitle }) => {
	return (
		<div className="sticky top-0 z-50 h-14">
			<div className="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
			<div className="relative z-50 flex h-full items-center gap-6 px-4 py-2">
				{goBack && (
					<Link href="/" passHref>
						<a>
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-colors hover:bg-border">
								<ArrowLeft className="text-text" />
							</div>
						</a>
					</Link>
				)}
				<div>
					<h2 className="text-xl font-bold">{title}</h2>
					{subtitle && <p className="text-sm text-text-grayed">{subtitle}</p>}
				</div>
			</div>
		</div>
	)
}

export default HeaderBox
