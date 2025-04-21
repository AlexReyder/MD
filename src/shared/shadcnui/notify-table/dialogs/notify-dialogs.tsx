"use client"
import { useNotify } from '@/shared/context/notify-context'
import { NotifyDeleteDialog } from './notify-delete-dialog'
import { NotifyMailDialog } from './notify-mail-dialog'

export function NotifyDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useNotify()

  return (
    <>

      {currentRow && (
        <>
         <NotifyMailDialog
            key={`notify-mail-${currentRow.id}`}
            open={open === 'mailNotify'}
            onOpenChange={() => {
              setOpen('mailNotify')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <NotifyDeleteDialog
            key={`notify-delete-${currentRow.id}`}
            open={open === 'deleteNotify'}
            onOpenChange={() => {
              setOpen('deleteNotify')
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