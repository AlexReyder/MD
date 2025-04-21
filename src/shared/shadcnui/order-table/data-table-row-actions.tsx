"use client"
import { useOrders } from '@/shared/context/orders-context'
import { Button } from '@/shared/shadcnui/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/shared/shadcnui/ui/dropdown-menu'
import { OrderDb } from '@/shared/types/validation/order'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { IconEdit } from '@tabler/icons-react'
import { Row } from '@tanstack/react-table'

interface DataTableRowActionsProps {
  row: Row<OrderDb>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow, setData } = useOrders()
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Открыть</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('updateOrder')
            }}
          >
            Обновить
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}