'use client'

import { deleteNotify } from '@/shared/api/admin/notify'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { NotifyProductsDb } from '@/shared/types/validation/notify-products'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: NotifyProductsDb
}

export function NotifyDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = async () => {

      const {success, error} = await deleteNotify(currentRow.id)

      if(success){
          toast.success('Уведомление успешно удалено')
        }
      
      if(error){
          toast.error('Произошла ошибка')
        }
      onOpenChange(false)

  }

  return (
   <>
    <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    handleConfirm={handleDelete}
    title={
      <span className='text-destructive'>
        <IconAlertTriangle
          className='mr-1 inline-block stroke-destructive'
          size={18}
        />{' '}
       Удалить уведомление
      </span>
    }
    desc={
      <div className='space-y-4'>
        <p className='mb-2'>
          Вы уверены что хотите удалить
          <span className='font-bold'> {currentRow.User.name}</span>?
          <br />
          Это перманентно удалит информацию с базы данных.
        </p>
      </div>
    }
    confirmText='Удалить'
    cancelBtnText='Отмена'
    destructive
    /> 
    <Toaster
         position="bottom-right"
         reverseOrder={false}
         toastOptions={{duration:3000}}
       />
   </>
  )
}