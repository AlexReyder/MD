"use client"
import LongText from '@/shared/shadcnui/long-text'
import { DataTableColumnHeader } from '@/shared/shadcnui/user-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/user-table/data-table-row-actions'
import { User } from '@/shared/types/schemas'
import { bonusStatusAdmin, userTypes } from '@/shared/types/user'
import { cn } from '@/shared/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '../ui/badge'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey:'name',
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Имя' />
    ),
    cell: ({ row }) => {
      const name= row.original.name
      return <LongText className='max-w-36'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'surname',
    id: 'surname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Фамилия' />
    ),
    cell: ({ row }) => {
      const surname = row.original.surname
      return <LongText className='max-w-36'>{surname}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'email',
    id:'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'phone',
    id:'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Номер телефона' />
    ),
    cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'purchasesAmount',
    id:'purchasesAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Сумма покупок' />
    ),
    cell: ({ row }) => <div>{row.getValue('purchasesAmount')}</div>,
  },
  {
    accessorKey: 'status',
    id:'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Программа лояльности' />
    ),
    cell: ({ row }) => {
      const { status } = row.original.Bonus[0]
      const badgeColor = bonusStatusAdmin.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {status}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'role',
    id:'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Роль' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const userType = userTypes.find(({ value }) => value === role)

      if (!userType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {userType.icon && (
            <userType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{row.getValue('role')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
    
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    
  },
]