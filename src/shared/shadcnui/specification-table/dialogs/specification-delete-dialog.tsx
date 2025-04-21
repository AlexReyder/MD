'use client'

import { removeSpecification } from '@/shared/api/admin/specifications'
import { SpecificationType } from '@/shared/context/specifications-context'
import { ConfirmDialog } from '@/shared/shadcnui/confirm-dialog'
import { SpecificationAdmin } from '@/shared/types/schemas'
import { IconAlertTriangle } from '@tabler/icons-react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: SpecificationAdmin
  specType: SpecificationType | null
}

const specNames = {
  material: 'материал',
  print: 'принт',
  country: 'страну'
}

export function SpecDeleteDialog({ open, specType, onOpenChange, currentRow }: Props) {
  const handleDelete = async () => {
		if(specType){
      console.log(currentRow)
      const {success, error} = await removeSpecification(currentRow.id, specType)

      if(success){
        toast.success('Спецификация успешно удалена')
      }
    
    if(error){
        toast.error('Произошла ошибка')
      }
      onOpenChange(false)
    
    }
  }

  return (
   <>
   {
    specType &&  <ConfirmDialog
    open={open}
    onOpenChange={onOpenChange}
    handleConfirm={handleDelete}
    title={
      <span className='text-destructive'>
        <IconAlertTriangle
          className='mr-1 inline-block stroke-destructive'
          size={18}
        />{' '}
       Удалить {specNames[specType]}
      </span>
    }
    desc={
      <div className='space-y-4'>
        <p className='mb-2'>
          Вы уверены что хотите удалить
          <span className='font-bold'> {currentRow.name}</span>?
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