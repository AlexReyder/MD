'use client'

import { deletePromocode } from '@/shared/api/admin/promocode'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { PromocodeDb } from '@/shared/types/validation/promocode'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: PromocodeDb
}

export function PromoDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = async () => {

      const {success, error} = await deletePromocode(currentRow.id)

      if(success){
          toast.success('Промокод успешно удален')
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
       Удалить промокод
      </span>
    }
    desc={
      <div className='space-y-4'>
        <p className='mb-2'>
          Вы уверены что хотите удалить
          <span className='font-bold'> {currentRow.value}</span>?
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