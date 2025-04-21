"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { usePromocode } from '../context/promocode-context'

export function PromoPrimaryButtons() {
  const { setOpen } = usePromocode()
  return (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('addPromocode')}>
            <span>Добавить промокод</span> <IconPlus size={18} />
            </Button>
        </div>
  )
}