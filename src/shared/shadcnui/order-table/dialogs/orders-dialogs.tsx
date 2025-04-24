"use client"
import { useOrders } from '@/shared/context/orders-context'
import { OrderUpdateDialog } from './orders-action-dialog'
import { OrderDetailsDialog } from './orders-details-dialogs'
import { OrderProductsDialog } from './orders-products-dialogs'

export function OrdersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useOrders()
  return (
    <>
      {currentRow && (
        <>
         <OrderUpdateDialog
            key={`order-orders-${currentRow.id}`}
            open={open === 'updateOrder'}
            onOpenChange={() => {
              setOpen('updateOrder')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
         <OrderDetailsDialog
            key={`order-details-${currentRow.id}`}
            open={open === 'detailsOrder'}
            onOpenChange={() => {
              setOpen('detailsOrder')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
         <OrderProductsDialog
            key={`order-products-${currentRow.id}`}
            open={open === 'productsOrder'}
            onOpenChange={() => {
              setOpen('productsOrder')
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