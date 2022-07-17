import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const Notifications: NextPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.replace('/notifications/mentions')
	}, [router])

	return <></>
}

export default Notifications
