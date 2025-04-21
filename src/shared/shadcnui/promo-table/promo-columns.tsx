"use client"
import LongText from '@/shared/shadcnui/long-text'
import { DataTableColumnHeader } from '@/shared/shadcnui/promo-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/promo-table/data-table-row-actions'
import { PromocodeDb } from '@/shared/types/validation/promocode'
import { formatDate } from '@/shared/utils/common'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<PromocodeDb>[] = [
  {
    id: 'value',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Значение' />
    ),
    cell: ({ row }) => {
      const value= row.original.value
      return <LongText className='w-full'>{value}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'discount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Скидка' />
    ),
    cell: ({ row }) => {
      const discount= row.original.discount
      return <LongText className='w-full'>{discount}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'expiresAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Истекает' />
    ),
    cell: ({ row }) => {
      const expiresAt= row.original.expiresAt
      return <p>{formatDate(expiresAt)}</p>
    },
    meta: { className: 'w-40' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]