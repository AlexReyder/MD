"use client"
import useDialogState from '@/shared/hooks/use-dialog-state'
import React, { useState } from 'react'
import { OrderDb } from '../types/validation/order'

type DialogType = 'updateOrder' | 'detailsOrder' | 'productsOrder'

interface OrdersContextType {
	open: DialogType | null
	setOpen: (str: DialogType | null) => void
	currentRow: OrderDb | null
	setCurrentRow: React.Dispatch<React.SetStateAction<OrderDb | null>>
	data?: any
	setData?: any
}

const OrdersContext = React.createContext<OrdersContextType | null>(null)

interface Props {
	children: React.ReactNode
}

export default function UsersProvider({ children }: Props) {
	const [open, setOpen] = useDialogState<DialogType>(null)
	const [data, setData] = useState<any>(null)
	const [currentRow, setCurrentRow] = useState<OrderDb | null>(null)

	return (
		<OrdersContext value={{ open, setOpen, currentRow, setCurrentRow, data, setData }}>
			{children}
		</OrdersContext>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => {
	const ordersContext = React.useContext(OrdersContext)

	if (!ordersContext) {
		throw new Error('useOrders has to be used within <OrdersContext>')
	}

	return ordersContext
}