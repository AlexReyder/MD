"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { useAd } from '../context/ad-context'

export function AdPrimaryButtons() {
  const { setOpen } = useAd()

  return (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
            <span>Добавить баннер</span> <IconPlus size={18} />
            </Button>
        </div>
  )
}