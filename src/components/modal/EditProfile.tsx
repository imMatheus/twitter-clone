import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import IconButton from '@/components/IconButton'
import Button from '@/components/button'
import { X } from 'react-feather'
import { useModal } from '@/context/ModalContext'
import Image from 'next/image'
import UserBannerImage from '@/../public/user-banner-white.svg'
import Input from '@/components/input'
import { MAX_LENGTHS } from '@/constants'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

const EditProfile: React.FC = ({}) => {
	const { currentUser } = useAuth()
	const router = useRouter()
	const { setShowModal } = useModal()
	const [handle, setHandle] = useState(currentUser!.handle || '')
	const [handleError, setHandleError] = useState('')
	const [name, setName] = useState(currentUser!.name || '')
	const [bio, setBio] = useState(currentUser!.bio || '')
	const [location, setLocation] = useState(currentUser!.location || '')
	const [website, setWebsite] = useState(currentUser!.website || '')
	const updateMutation = trpc.useMutation('users.update')

	const utils = trpc.useContext()
	function handleUpdate() {
		updateMutation.mutate(
			{
				handle,
				name,
				bio,
				location,
				website
			},
			{
				onSuccess() {
					setShowModal(false)
					utils.invalidateQueries(['me'])
					utils.invalidateQueries(['users.byId'])
					if (handle !== currentUser?.handle) return router.replace(`/users/${handle}`)
				},
				onError(...ctx) {
					console.log('errored')
					console.log(ctx)
					setHandleError(`A user with the handle ${handle} already exist or the name is to small`)
				}
			}
		)
	}

	if (!currentUser) return null

	return (
		<div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-text/50 p-2">
			<div className="relative h-[clamp(25rem,_40rem,_90vh)] w-full max-w-xl overflow-scroll rounded-md bg-bg">
				<div className="sticky top-0 z-50 h-14 overflow-hidden rounded-t-md">
					<div className="absolute inset-0 bg-bg opacity-80"></div>
					<div className="absolute inset-0 backdrop-blur-md"></div>
					<div className="relative z-50 flex h-full items-center justify-between gap-6 px-4">
						<div className="flex items-center gap-6">
							<IconButton Icon={X} onClick={() => setShowModal(false)} />
							<h2 className="text-xl font-semibold">Edit profile</h2>
						</div>
						<Button variant="dark" onClick={handleUpdate} size="small" disabled={!handle || !name}>
							Save
						</Button>
					</div>
				</div>

				<div className="relative h-36 bg-bg-grayed-dark md:h-44">
					<Image src={UserBannerImage} alt="User profile banner" layout="fill" objectFit="cover" />
				</div>
				<div className="px-4">
					<div className="h-14 w-28">
						<div className="relative h-28 w-full -translate-y-1/2 rounded-full border-4 border-bg">
							<Image
								layout="fill"
								src={currentUser.image}
								className="rounded-full"
								alt={`${currentUser.name} profile image`}
							/>
						</div>
					</div>
					<Input
						value={handle}
						onChange={setHandle}
						label="Handle"
						maxLength={MAX_LENGTHS.handle}
						required
						error={handleError}
						noSpaces
					/>
					<Input value={name} onChange={setName} label="Name" maxLength={MAX_LENGTHS.name} required />
					<Input value={bio} onChange={setBio} label="Bio" maxLength={MAX_LENGTHS.bio} />
					<Input value={location} onChange={setLocation} label="Location" maxLength={MAX_LENGTHS.location} />
					<Input value={website} onChange={setWebsite} label="Website" maxLength={MAX_LENGTHS.website} />
				</div>
			</div>
		</div>
	)
}

export default EditProfile
