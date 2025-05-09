'use client'

import { deleteAd } from '@/shared/api/admin/ad'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { AdAdmin } from '@/shared/types/schemas'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: AdAdmin
}


export function AdDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = async () => {
      const {success, error} = await deleteAd(currentRow.id!, currentRow.url, currentRow.mobileUrl)
      if(success){
          toast.success('Баннер успешно удален')
        }
      if(error){
          toast.error('Произошла ошибка')
        }
      onOpenChange(false)
  }

  return (
   <>
   {
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
       Удалить баннер
      </span>
    }
    desc={
      <div className='space-y-4'>
        <p className='mb-2'>
          Вы уверены что хотите удалить
          <span className='font-bold'> "{currentRow.alt}"</span>?
          <br />
          Это перманентно удалит информацию с базы данных.
        </p>
      </div>
    }
    confirmText='Удалить'
    cancelBtnText='Отмена'
    destructive
    />
   }
    <Toaster
         position="bottom-right"
         reverseOrder={false}
         toastOptions={{duration:3000}}
       />
   </>
  )
}