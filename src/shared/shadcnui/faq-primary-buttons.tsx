"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { useFAQ } from '../context/faq-context'

export function FAQPrimaryButtons() {
  const { setOpen } = useFAQ()

  return (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
            <span>Добавить ответ</span> <IconPlus size={18} />
            </Button>
        </div>
  )
}