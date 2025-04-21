"use client"
import { useOrders } from '@/shared/context/orders-context'
import { UsersOrdersDialog } from './users-orders-dialog'

export function OrdersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, data } = useOrders()
  return (
    <>
      {currentRow && (
        <>
         <UsersOrdersDialog
            key={`user-orders-${currentRow.id}`}
            open={open === 'status'}
            data={data}
            onOpenChange={() => {
              setOpen('status')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}