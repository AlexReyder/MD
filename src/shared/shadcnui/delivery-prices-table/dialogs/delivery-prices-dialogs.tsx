"use client"
import { useDeliveryPrices } from '@/shared/context/delivery-prices-context'
import { DeliveryPricesActionDialog } from './delivery-prices-action-dialog'

export function DeliveryPricesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow} = useDeliveryPrices()

  return (
    <>

    {currentRow ? (
         <DeliveryPricesActionDialog
         key={`delivery-prices-edit`}
         open={open === 'updateDeliver'}
         onOpenChange={() => {
           setOpen('updateDeliver')
           setTimeout(() => {
             setCurrentRow(null)
           }, 500)
         }}
         currentRow={currentRow}
       />
    ) : null}


    </>
  )
}