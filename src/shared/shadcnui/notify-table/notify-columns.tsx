"use client"
import LongText from '@/shared/shadcnui/long-text'
import { DataTableColumnHeader } from '@/shared/shadcnui/notify-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/notify-table/data-table-row-actions'
import { NotifyProductsDb } from '@/shared/types/validation/notify-products'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

export const columns: ColumnDef<NotifyProductsDb>[] = [
  {
    id: 'isNotified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Отреагировано' />
    ),
    cell: ({ row }) => {
      const isNotified= row.original.isNotified
      return <LongText className='w-full'>{isNotified ? 'Да' : 'Нет'}</LongText>
    },
    meta: { className: 'w-18' },
  },
  {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Товар' />
    ),
    cell: ({ row }) => {
      const name= row.original.name
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'articleNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Артикул' />
    ),
    cell: ({ row }) => {
      const articleNumber= row.original.articleNumber
      return <LongText className='w-full'>{articleNumber}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Цвет' />
    ),
    cell: ({ row }) => {
      const color= row.original.color
      return <LongText className='w-full'>{color}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Размер' />
    ),
    cell: ({ row }) => {
      const size= row.original.size
      return <LongText className='w-full'>{size}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Дата уведомления' />
    ),
    cell: ({ row }) => {
      const createdAt= row.original.createdAt as Date
      return <LongText className='w-full'>{format(createdAt,"d.MM.yyyy h:mm ", {locale: ru})}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]