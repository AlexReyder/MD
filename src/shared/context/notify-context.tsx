"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { NotifyProductsDb } from '../types/validation/notify-products'

type DialogType = 'mailNotify' |'deleteNotify' 

interface ContextType {
	open: DialogType | null
	setOpen: (str: DialogType | null) => void
	currentRow: NotifyProductsDb | null
	setCurrentRow: Dispatch<SetStateAction<NotifyProductsDb | null>>
}

const NotifyContext = createContext<ContextType | null>(null)

interface Props {
	children: ReactNode
}

export default function NotifyProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<DialogType>(null)
	const [currentRow, setCurrentRow] = useState<NotifyProductsDb | null>(null);

	return(
		<NotifyContext value={{ open, setOpen, currentRow, setCurrentRow}}>
		{children}
	</NotifyContext>
	)
}


export const useNotify = () => {
	const nofityContext = React.useContext(NotifyContext)

	if (!nofityContext) {
		throw new Error('useNofity has to be used within <nofityContext>')
	}

	return nofityContext
}