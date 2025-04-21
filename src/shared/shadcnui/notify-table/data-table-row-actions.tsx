"use client"
import { useNotify } from '@/shared/context/notify-context'
import { Button } from '@/shared/shadcnui/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/shared/shadcnui/ui/dropdown-menu'
import { NotifyProductsDb } from '@/shared/types/validation/notify-products'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Row } from '@tanstack/react-table'

interface DataTableRowActionsProps {
  row: Row<NotifyProductsDb>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useNotify()
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
              setOpen('mailNotify')
            }}
          >
            Отправить уведомление
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('deleteNotify')
            }}
          >
            Удалить уведомление
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}