"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import React, { useState } from 'react'
import { DeliveryPricesDb } from '../types/validation/delivery-prices'

type DialogType = 'addDeliver' | 'updateDeliver' | 'deleteDeliver'

interface DeliveryPricesContextType {
	open: DialogType | null
	setOpen: (str: DialogType | null) => void
	currentRow: DeliveryPricesDb | null
	setCurrentRow: React.Dispatch<React.SetStateAction<DeliveryPricesDb | null>>
}

const DeliveryPricesContext = React.createContext<DeliveryPricesContextType | null>(null)

interface Props {
	children: React.ReactNode
}

export default function DeliveryPricesProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<DialogType>(null)
	const [currentRow, setCurrentRow] = useState<DeliveryPricesDb | null>(null)

	return (
		<DeliveryPricesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
			{children}
		</DeliveryPricesContext>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDeliveryPrices = () => {
	const deliveryPricesContext = React.useContext(DeliveryPricesContext)

	if (!deliveryPricesContext) {
		throw new Error('useDeliveryPrices has to be used within <deliveryPricesContext>')
	}

	return deliveryPricesContext
}