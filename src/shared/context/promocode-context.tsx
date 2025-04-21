"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import { PromocodeDb } from '@/shared/types/validation/promocode'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type DialogType = 'addPromocode' | 'editPromocode' |'deletePromocode' 

interface ContextType {
	open: DialogType | null
	setOpen: (str: DialogType | null) => void
	currentRow: PromocodeDb | null
	setCurrentRow: Dispatch<SetStateAction<PromocodeDb | null>>
}

const PromocodeContext = createContext<ContextType | null>(null)

interface Props {
	children: ReactNode
}

export default function PromocodeProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<DialogType>(null)
	const [currentRow, setCurrentRow] = useState<PromocodeDb | null>(null);

	return(
		<PromocodeContext value={{ open, setOpen, currentRow, setCurrentRow}}>
		{children}
	</PromocodeContext>
	)
}


export const usePromocode = () => {
	const promocodeContext = React.useContext(PromocodeContext)

	if (!promocodeContext) {
		throw new Error('usePromocode has to be used within <promocodeContext>')
	}

	return promocodeContext
}