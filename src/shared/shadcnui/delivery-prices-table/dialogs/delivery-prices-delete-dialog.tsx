'use client'

import { deleteDeliveryPrice } from '@/shared/api/admin/delivery-prices'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { DeliveryPricesDb } from '@/shared/types/validation/delivery-prices'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: DeliveryPricesDb
}

export function DeliveryPriceDeleteDialog({ open, onOpenChange, currentRow }: Props) {
 
  const handleDelete = async () => {
      const {success, error} = await deleteDeliveryPrice(currentRow.id)
      if(success){
          toast.success('Успешно удалено')
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
       Удалить
      </span>
    }
    desc={
      <div className='space-y-4'>
        <p className='mb-2'>
          Вы уверены что хотите совершить удаление?
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