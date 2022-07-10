import React from 'react'
import ColorPicker from './ColorPicker'
import Header from './Header'
import { GitHub, Twitter } from 'react-feather'
import Link from 'next/link'

const About: React.FC = ({}) => {
	return (
		<div className="border-b border-b-border p-4">
			<Header text="About this project" />
			<p className="mb-2 text-sm text-text">
				This project was made by Matheus Mendes as a fun and concrete way to learn some new tech (tRPC and MySQL
				with PlanetScale). The whole tech stack is, Next.js, Next-auth, TailwindCSS, tRPC, Prisma, PlanetScale,
				and of course Typescript for both the front- and backend. You can find all the source code in the link
				below as well as an actual link to my Twitter.
			</p>

			<div className="flex gap-2">
				<Link href="https://github.com/imMatheus/twitter-clone" passHref>
					<a
						target="_blank"
						rel="noreferrer"
						className="flex min-w-0 items-center gap-2 rounded border border-border bg-black p-3 text-white transition-opacity hover:opacity-80"
					>
						<GitHub className="h-4 w-4" />
						Source code
					</a>
				</Link>

				<Link href="https://twitter.com/whosmatu" passHref>
					<a
						target="_blank"
						rel="noreferrer"
						className="flex min-w-0 items-center gap-2 rounded bg-[rgb(29_155_240)] p-3 text-white transition-opacity hover:opacity-80"
					>
						<Twitter className="h-4 w-4" />
						@whosmatu
					</a>
				</Link>
			</div>
		</div>
	)
}

export default About
