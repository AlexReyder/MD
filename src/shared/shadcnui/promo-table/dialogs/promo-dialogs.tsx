"use client"
import { usePromocode } from '@/shared/context/promocode-context'
import { PromoActionDialog } from './promo-action-dialog'
import { PromoDeleteDialog } from './promo-delete-dialog'

export function PromoDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePromocode()

  return (
    <>

     <PromoActionDialog
     key='promo-add'
     open={open === 'addPromocode'}
     onOpenChange={() => setOpen('addPromocode')}
    />

          
      {currentRow && (
        <>
         <PromoActionDialog
            key={`promo-edit-${currentRow.id}`}
            open={open === 'editPromocode'}
            onOpenChange={() => {
              setOpen('editPromocode')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <PromoDeleteDialog
            key={`promo-delete-${currentRow.id}`}
            open={open === 'deletePromocode'}
            onOpenChange={() => {
              setOpen('deletePromocode')
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