"use client"
import { useFAQ } from '@/shared/context/faq-context'
import { FAQActionDialog } from './faq-action-dialog'
import { FAQDeleteDialog } from './faq-delete-dialog'

export function FAQDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFAQ()

  return (
    <>
     <FAQActionDialog
     key='faq-add'
     open={open === 'add'}
     onOpenChange={() => setOpen('add')}
  />
       
      {currentRow && (
        <>
         <FAQActionDialog
            key={`faq-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <FAQDeleteDialog
            key={`faq-delete-${currentRow.id}`}
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