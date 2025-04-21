'use client'

import { removeUser } from '@/shared/api/admin/users'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { User } from '@/shared/types/schemas'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const handleDelete = async () => {
    const {success, error} = await removeUser(currentRow.id)
    if(success){
        toast.success('Пользователь успешно удален')
        }
          
    if(error){
        toast.error('Произошла ошибка')
        console.log(error)
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
         Удалить пользователя
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Вы уверены что хотите удалить
            <span className='font-bold'> {currentRow.name} {currentRow.surname}</span>?
            <br />
						Это перманентно удалит пользователя с базы данных.
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