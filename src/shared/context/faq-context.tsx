"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import { FAQAdmin } from '@/shared/types/schemas'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type FAQDialogType = 'add' | 'edit' |'delete' 

interface FAQContextType {
	open: FAQDialogType | null
	setOpen: (str: FAQDialogType | null) => void
	currentRow: FAQAdmin | null
	setCurrentRow: Dispatch<SetStateAction<FAQAdmin | null>>
}

const FAQContext = createContext<FAQContextType | null>(null)

interface Props {
	children: ReactNode
}

export default function FAQProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<FAQDialogType>(null)
	const [currentRow, setCurrentRow] = useState<FAQAdmin | null>(null);

	return(
		<FAQContext value={{ open, setOpen, currentRow, setCurrentRow}}>
		{children}
	</FAQContext>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFAQ = () => {
	const faqContext = React.useContext(FAQContext)

	if (!faqContext) {
		throw new Error('useFilter has to be used within <faqContext>')
	}

	return faqContext
}