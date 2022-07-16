import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const Notifications: NextPage = () => {
	const router = useRouter()
	router.push('/notifications/mentions')
	return <></>
}

export default Notifications
