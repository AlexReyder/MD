"use client"
import { useOrders } from '@/shared/context/orders-context'
import LongText from '@/shared/shadcnui/long-text'
import { DataTableColumnHeader } from '@/shared/shadcnui/order-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/order-table/data-table-row-actions'
import { orderStatusTypes, orderStatusTypesAdmin, paymentTypeAdminForm } from '@/shared/types/user'
import { OrderDb } from '@/shared/types/validation/order'
import { cn } from '@/shared/utils'
import { ColumnDef, RowData } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { Button } from '../ui/button'

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:  'selectPayment' | 'selectDeliver' | 'selectOrderStatus' | 'selectBonus' | 'selectUserRole' | 'selectProductCategory'
  }
}

export const columns: ColumnDef<OrderDb>[] = [
  {
    id:'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID заказа' />
    ),
    cell: ({ row }) => {
      const id = row.original.id
      return <p className='max-w-full'>{id}</p>
    },
    enableSorting: false,
  },
  {
    accessorKey:'payment',
    id: 'payment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Платеж' />
    ),
    cell: ({ row }) => {
      const name= row.original.payment
      const selected = paymentTypeAdminForm.filter((item) => item.value === name)[0].label
      return <LongText className='max-w-36'>{selected}</LongText>
    },
    enableHiding: false,
    enableSorting: true,
    enableColumnFilter: true,
    meta: { className: 'w-36', filterVariant: 'selectPayment' },
  },
  {
    id: 'delivery',
    accessorKey: 'delivery',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Доставка' />
    ),
    cell: ({ row }) => {
      const delivery = row.original.payment === 'DEFFERED' ? 'Отсутствует' : row.original.delivery
      return <LongText className='max-w-36'>{delivery}</LongText>
    },
    enableHiding: false,
    enableSorting: true,
    enableColumnFilter: true,
    meta: { className: 'w-36', filterVariant: 'selectDeliver' },
     
  },
  {
    id:'products',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Заказанные товары' />
    ),
    cell: ({ row }) =>  {
      const { setOpen, setCurrentRow } = useOrders()
          return(<Button variant={'outline'} className='w-fit text-nowrap' onClick={() => {
            setCurrentRow(row.original)
            setOpen('productsOrder')
          }}>Открыть</Button>
        )
      }
  },
  {
    id:'details',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Данные заказчика' />
    ),
    cell: ({ row }) =>  {
      const { setOpen, setCurrentRow } = useOrders()
    return(<Button variant={'outline'} className='w-fit text-nowrap' onClick={() => {
      setCurrentRow(row.original)
      setOpen('detailsOrder')
    }}>Открыть</Button>
  )
}
  },
  {
    id:'promocode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Промокод' />
    ),
    cell: ({ row }) => {
      const promocode = row.original.Promocode?.value ? row.original.Promocode?.value : 'Отсутствует'
      return <LongText className='max-w-36'>{promocode}</LongText>
    },
  },
  {
    id:'bonusAmountMinus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Бонусов списано' />
    ),
    cell: ({ row }) => {
      const bonus = row.original.bonusMinusAmount
      return <LongText className='max-w-36'>{bonus}</LongText>
    },
  },
  {
    id:'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Сумма' />
    ),
    cell: ({ row }) => {
      const name = row.original.amount
      return <LongText className='max-w-36'>{name}</LongText>
    },
  },
  {
    id:'deliveryPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Цена доставки' />
    ),
    cell: ({ row }) => {
      const name = row.original.payment !== 'DEFFERED' ? row.original.deliveryPrice  : 'Отсутствует'
      return <LongText className='max-w-36'>{name}</LongText>
    },
  },
  {
    id:'track',
    accessorKey:'track',
    accessorFn: (row) => row.trackNumber,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Трек-номер' />
    ),
    cell: ({ row }) => {
      const name = row.original.trackNumber ? row.original.trackNumber  : 'Отсутствует'
      return <LongText className='max-w-36'>{name}</LongText>
    },
    enableSorting: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status',
    id:'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Статус' />
    ),
    cell: ({ row }) => {
      const name = orderStatusTypes.filter((el) => el.value === row.original.status)[0].label
      const badgeColor = orderStatusTypesAdmin.get(row.original.status)
      return <LongText className={cn('max-w-36', badgeColor)}>{name}</LongText>
    },
    enableHiding: false,
    enableSorting: true,
    enableColumnFilter: true,
    meta: { className: 'w-36', filterVariant: 'selectOrderStatus' },
  },
  {
    id:'createdAt',
    accessorKey:'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Создан' />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt
      return(
       <div>{format(date,"d.MM.yyyy h:mm ", {locale: ru})}</div>
      )
  },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    
  },
]