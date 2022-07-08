import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import IconButton from '@/components/IconButton'
import Button from '@/components/button'
import { X } from 'react-feather'
import { useModal } from '@/context/ModalContext'
import Image from 'next/image'
import UserBannerImage from '@/../public/user-banner-white.svg'
import Input from '@/components/input'
import { trpc } from '@/utils/trpc'

const EditProfile: React.FC = ({}) => {
	const { currentUser } = useAuth()
	const { setShowModal } = useModal()
	const [name, setName] = useState(currentUser!.name || '')
	const [bio, setBio] = useState(currentUser!.bio || '')
	const [location, setLocation] = useState(currentUser!.location || '')
	const [website, setWebsite] = useState(currentUser!.website || '')
	const updateMutation = trpc.useMutation('users.update')
	const utils = trpc.useContext()
	function handleUpdate() {
		console.log('ggg')

		updateMutation.mutate(
			{
				name,
				bio,
				location,
				website
			},
			{
				onSuccess() {
					console.log('sss')

					setShowModal(false)
					utils.invalidateQueries(['me'])
					utils.invalidateQueries(['users.byId'])
				},
				onError(s) {
					console.log('errrorrrr')

					console.log(s)
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
						<Button variant="dark" onClick={handleUpdate} size="small">
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
					<Input value={name} onChange={setName} label="Name" maxLength={50} required />
					<Input value={bio} onChange={setBio} label="Bio" maxLength={160} />
					<Input value={location} onChange={setLocation} label="Location" maxLength={30} />
					<Input value={website} onChange={setWebsite} label="Website" maxLength={100} />
				</div>
			</div>
		</div>
	)
}

export default EditProfile
