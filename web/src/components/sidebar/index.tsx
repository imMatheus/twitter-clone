import React from 'react'
import styles from './sidebar.module.scss'
import { Twitter, Home, Hash, Bell, Mail, User, Settings } from 'react-feather'
import Row from './Row'
import Image from 'next/image'
import Link from 'next/link'
// import {ReactComponent} from ''

const Sidebar: React.FC = ({}) => {
	return (
		<section className={styles.sidebar}>
			<ul className={styles.sidebar__list}>
				{/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA1ZJREFUaEPtWNFR20AQfbsUEKcCnAIsLhXgVBBTAVABVgUxFQjSQKCCmAriVIB8LiBOBUAB3GZWlicekHR3luIMM74vz3hvte/t3rvdI7zxRW88fuwB/O8M7jOwz0BLBvYlFENgZkyPnbsQoj5EDAADkRmYl0J0m+b5rMqf7kvz/LHqv9oMZMb00zxfxgTYZJsZMyTnvgHo19qJzOTg4GQdrMbAzp064GNq7SgOQJJMiehhPJ+ftwWRJcmEgC+BfnIAmolhkSEAwvypLjuVGdCUkXMPxQeJbtqAKJn/ERj8KzMBLlNrJ3X76wBouv9+dEsQJRH3jWXTgEyA9EDk3hGNBHifWnv20jwMwGpXLsznaZ5rioNWNhicEZHWfaslRHMQDasOcgyAVUUBkwtrL0Miiqz9Spdl8KM6QakDYMg5TX3dyklkcrFY3DUqT5LMCDgOAVtl08T82r5eRo+ONMgjz8dVZqfCfF3FUNYWQIP6+AEMBiMi+h7BXg4iBb2ESE7A4zPRZasMtAGggWd6FwCfI0B0atqk/40ZUO1m5w4d8x2cuyLgtNPIAp0J8wdfNxCiQiqbxY246zW21tts1hpcJYnsOuDN76kCpfO5l7h6FWqpIG3BC3CdWjv2+WnsRsm5Xz4H/+p/ETlJF4upz39jjXVxk/oCqPn/aWxtL2Sv95B01c+EBLO2EeC2qnGr8uEFUNwHxgzh3Nmu5FSYP4Y2jV4AmTGGnSsuMyHSEbByMophuMlWgJ+ptTrMBK0QAP1dHuYY9hWhF0BRQklys4vyCZXOzdSEATCmp68HAd1pUNqrjAT4DWZT9/pQ5zgIQHmQe3BOm7ut+/sGdE/CrBNX8LS39hUMYL1hrUg653YFRkTO08XiZpv0RQPYANInkaytKrUJPvgQbzJTvq6dCqBPHUG3ZR2zbYOPAvB1MDjW5w0A+rTRLvDVgdVBPbrmX5LxqoTKYeZYNMjV+6U+bgVfLL46VqkE8yRWbaJUSN8k4Zxqf2eKozcsmMddsB58D5RAtCcfEXDoY/fl/4W2A1MwX/lGw1jf0TKqPRGen01ZTsULM61GzXf6u2B4tbSul2Cedc12FcitZXRbxrretwfQNaOx/vYZiGWsa/t9BrpmNNbfm8/AH27QakCGeQvyAAAAAElFTkSuQmCC" /> */}

				{/* <Image src="/twitter.svg" alt="Twitter icon" width="32" height="32" /> */}
				<Row src="/twitter.svg" href="/" />
				<Row Icon={Home} text="Home" href="/" />
				<Row Icon={Hash} text="Explore" href="/" />
				<Row Icon={Bell} text="Notifications" href="/" />
				<Row Icon={Mail} text="Messages" href="/" />
				<Row Icon={User} text="Profile" href="/users/yonny" />
				<Row Icon={Settings} text="Settings" href="/settings" />
			</ul>
			<button className="w-full rounded-full bg-accent px-4 py-3 text-lg font-bold text-white transition-opacity hover:opacity-80">
				Tweet
			</button>
			<Link href="/users/abc" passHref>
				<a className="mt-auto block">
					<div className="flex cursor-pointer items-center rounded-full p-3 transition-colors hover:bg-bg-grayed-dark">
						<div className="relative mr-2 h-10 w-10 flex-shrink-0 rounded-full bg-white">
							<Image
								src="https://avatars.dicebear.com/api/identicon/sarre.svg"
								alt="user avatar"
								width={40}
								height={40}
								layout="fill"
								className="rounded-full"
							/>
						</div>
						<div className="overflow-hidden">
							<h3 className="truncate font-bold">Matheus mendes barata de almeida</h3>
							<p className="font-normal text-text-grayed">@matumatu</p>
						</div>
					</div>
				</a>
			</Link>
		</section>
	)
}

export default Sidebar
