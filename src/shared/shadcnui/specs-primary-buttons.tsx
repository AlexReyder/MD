"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { SpecificationType, useSpecification } from '../context/specifications-context'

export function SpecsPrimaryButtons({specType}:{specType:SpecificationType}) {
  const { setOpen } = useSpecification()
  const specNames = {
    material: 'новый материал',
    print: 'новый принт',
    country: 'новую страну'
  }
  return (
    <>
    {
      specType && (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
            <span>Добавить {specNames[specType]}</span> <IconPlus size={18} />
            </Button>
        </div>
      )
    }
    </>
  )
}