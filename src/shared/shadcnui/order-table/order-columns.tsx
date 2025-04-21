"use client"
import LongText from '@/shared/shadcnui/long-text'
import { DataTableColumnHeader } from '@/shared/shadcnui/order-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/order-table/data-table-row-actions'
import { OrderDb } from '@/shared/types/validation/order'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'

export const columns: ColumnDef<OrderDb>[] = [
  {
    id: 'payment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Платеж' />
    ),
    cell: ({ row }) => {
      const name= row.original.payment
      return <LongText className='max-w-36'>{name}</LongText>
    },
    
    meta: { className: 'w-36' },
  },
  {
    id: 'delivery',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Доставка' />
    ),
    cell: ({ row }) => {
      const delivery = row.original.delivery
      return <LongText className='max-w-36'>{delivery}</LongText>
    },
    meta: { className: 'w-36' },
     
  },
  {
    id:'products',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Заказанные товары' />
    ),
    cell: ({ row }) => (
      <Button variant={'outline'} className='w-fit text-nowrap'>Открыть</Button>
    ),
    // {row.getValue('products')}
  },
  {
    id:'details',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Данные заказчика' />
    ),
    cell: ({ row }) =>  <Button variant={'outline'} className='w-fit text-nowrap'>Открыть</Button>
  },
  {
    id:'promocode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Промокод' />
    ),
    cell: ({ row }) => {
      const promocode = row.original.Promocode?.value
      return <LongText className='max-w-36'>{promocode}</LongText>
    },
  },
  {
    id:'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Создан' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      return(
      <div>{date.toLocaleString('ru-RU',{year: 'numeric', month: '2-digit', day: '2-digit', hour:'numeric', minute:'numeric'})}</div>
  )
  },
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const { status } = row.original
  //     const badgeColor = callTypes.get(status)
  //     return (
  //       <div className='flex space-x-2'>
  //         <Badge variant='outline' className={cn('capitalize', badgeColor)}>
  //           {row.getValue('status')}
  //         </Badge>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  //   enableHiding: false,
  //   enableSorting: false,
  // },

  {
    id: 'actions',
    cell: DataTableRowActions,
    
  },
]