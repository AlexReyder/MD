"use client"
import { useUsers } from '@/shared/context/users-context'
import { Button } from '@/shared/shadcnui/ui/button'
import { IconUserPlus } from '@tabler/icons-react'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Зарегистрировать нового пользователя</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}