import React, { createContext, useContext, useState } from 'react'
import EditProfileModal from '@/components/modal/EditProfile'

type Modals = 'edit-profile'

interface Context {
	showModal: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	modal: React.ReactNode
	setModal: React.Dispatch<React.SetStateAction<Modals>>
}

const ModalContext = createContext<Context>({
	showModal: false,
	setShowModal: () => null,
	modal: <EditProfileModal />,
	setModal: () => null
})

export function useModal() {
	return useContext(ModalContext)
}

interface ModalProviderProps {
	children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [_modal, setModal] = useState<Modals>('edit-profile')
	const [showModal, setShowModal] = useState(false)

	const modals: { [key in Modals]: React.ReactNode } = {
		'edit-profile': <EditProfileModal />
	}

	const value = {
		showModal,
		setShowModal,
		modal: modals[_modal],
		setModal
	}
	return (
		<ModalContext.Provider value={value}>
			<>
				{children}
				{showModal && value.modal}
			</>
		</ModalContext.Provider>
	)
}
