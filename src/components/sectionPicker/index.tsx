import React from 'react'
import type { OptionProps } from './Option'

interface SectionPickerProps {
	children: React.ReactElement<OptionProps> | Array<React.ReactElement<OptionProps>>
}

const SectionPicker: React.FC<SectionPickerProps> = ({ children }) => {
	return <div className="flex w-full min-w-0 gap-1 overflow-x-scroll border-b border-b-border">{children}</div>
}

export default SectionPicker
