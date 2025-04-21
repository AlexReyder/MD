"use client"
import { useAd } from '@/shared/context/ad-context'
import { AdActionDialog } from './ad-action-dialog'
import { AdDeleteDialog } from './ad-delete-dialog'

export function AdDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAd()

  return (
    <>
     <AdActionDialog
     key='ad-add'
     open={open === 'add'}
     onOpenChange={() => setOpen('add')}
  />
       
      {currentRow && (
        <>
         <AdActionDialog
            key={`ad-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <AdDeleteDialog
            key={`ad-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
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