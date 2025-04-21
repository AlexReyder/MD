"use client"
import { getUserOrders } from '@/shared/api/admin/users'
import { useUsers } from '@/shared/context/users-context'
import { Button } from '@/shared/shadcnui/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/shared/shadcnui/ui/dropdown-menu'
import { User } from '@/shared/types/schemas'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { IconEdit, IconStars, IconTrash } from '@tabler/icons-react'
import { Row } from '@tanstack/react-table'

interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow, setData } = useUsers()
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
        <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
            onClick={async () => {
              const orders = await getUserOrders(row.original.id);
              setData(orders)
              setCurrentRow(row.original)
              setOpen('bonus')
            }}
          >
            Начислить бонусы
            <DropdownMenuShortcut>
              <IconStars size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('edit')
            }}
          >
            Изменить
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='!text-red-500'
          >
            Удалить
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}