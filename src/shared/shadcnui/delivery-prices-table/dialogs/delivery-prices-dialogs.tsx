"use client"
import { useDeliveryPrices } from '@/shared/context/delivery-prices-context'
import { DeliveryPricesActionDialog } from './delivery-prices-action-dialog'
import { DeliveryPriceDeleteDialog } from './delivery-prices-delete-dialog'

export function DeliveryPricesDialogs({ data }: {data:any}) {
  const { open, setOpen, currentRow, setCurrentRow} = useDeliveryPrices()


  return (
    <>
     <DeliveryPricesActionDialog
     key='deliver-prices-add'
     open={open === 'addDeliver'}
     onOpenChange={() => setOpen('addDeliver')}
     data={data}
  />
  
          
      {currentRow && (
        <>
         <DeliveryPricesActionDialog
            key={`delivery-prices-edit-${currentRow.id}`}
            open={open === 'updateDeliver'}
            onOpenChange={() => {
              setOpen('updateDeliver')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            data={data}
          />

          <DeliveryPriceDeleteDialog
            key={`delivery-delete-${currentRow.id}`}
            open={open === 'deleteDeliver'}
            onOpenChange={() => {
              setOpen('deleteDeliver')
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