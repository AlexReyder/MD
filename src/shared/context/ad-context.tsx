"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import { AdAdmin } from '@/shared/types/schemas'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type AdDialogType = 'add' | 'edit' |'delete' 

interface AdContextType {
	open: AdDialogType | null
	setOpen: (str: AdDialogType | null) => void
	currentRow: AdAdmin | null
	setCurrentRow: Dispatch<SetStateAction<AdAdmin | null>>
}

const AdContext = createContext<AdContextType | null>(null)

interface Props {
	children: ReactNode
}

export default function AdProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<AdDialogType>(null)
	const [currentRow, setCurrentRow] = useState<AdAdmin | null>(null);

	return(
		<AdContext value={{ open, setOpen, currentRow, setCurrentRow}}>
		{children}
	</AdContext>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAd = () => {
	const adContext = React.useContext(AdContext)

	if (!adContext) {
		throw new Error('useAdd has to be used within <adContext>')
	}

	return adContext
}