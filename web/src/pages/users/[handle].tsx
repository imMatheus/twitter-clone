import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const UserPage: NextPage = () => {
    const router = useRouter()
    const { handle } = router.query
    return <div className='bg-red-500'>hej + {handle}</div>
}

export default UserPage
