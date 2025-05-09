"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconRefresh } from '@tabler/icons-react'
import { useDeliveryPrices } from '../context/delivery-prices-context'

export function DeliveryPricesButtons() {
  const { setOpen } = useDeliveryPrices()
  return (

        <div className='flex gap-2 mt-4 mb-4'>
            <Button className='space-x-1' onClick={() => setOpen('updateDeliver')}>
            <span>Обновить</span> <IconRefresh size={18} />
            </Button>
        </div>
  )
}