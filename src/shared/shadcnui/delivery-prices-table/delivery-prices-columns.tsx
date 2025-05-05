"use client"
import { DataTableColumnHeader } from '@/shared/shadcnui/delivery-prices-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/delivery-prices-table/data-table-row-actions'
import LongText from '@/shared/shadcnui/long-text'
import { DeliveryPricesDb } from '@/shared/types/validation/delivery-prices'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<DeliveryPricesDb>[] = [
  {
    id: 'delivery',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Доставка' />
    ),
    cell: ({ row }) => {
      const name= row.original.deliver
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Стоимость' />
    ),
    cell: ({ row }) => {
      const name= row.original.price
      return <p>{name}</p>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]