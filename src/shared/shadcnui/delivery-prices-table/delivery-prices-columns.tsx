"use client"
import { DataTableColumnHeader } from '@/shared/shadcnui/delivery-prices-table/data-table-column-header'
import LongText from '@/shared/shadcnui/long-text'
import { DeliveryPricesDb } from '@/shared/types/validation/delivery-prices'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<DeliveryPricesDb>[] = [
  {
    id: 'cdek',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Стоимость доставки CDEK' />
    ),
    cell: ({ row }) => {
      const name= row.original.CDEK
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'cdekdays',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Срок доставки CDEK' />
    ),
    cell: ({ row }) => {
      const name= row.original.CDEKdays
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'mailrussia',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Стоимость доставки Почты России' />
    ),
    cell: ({ row }) => {
      const name= row.original.MAILRUSSIA
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'mailrussiadays',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Срок доставки Почты России' />
    ),
    cell: ({ row }) => {
      const name= row.original.MAILRUSSIAdays
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'yandex',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Стоимость доставки Яндекс Доставка' />
    ),
    cell: ({ row }) => {
      const name= row.original.YANDEX
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'yandexdays',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Срок доставки Яндекс Доставка' />
    ),
    cell: ({ row }) => {
      const name= row.original.YANDEXdays
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'fivepost',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Стоимость доставки 5POST' />
    ),
    cell: ({ row }) => {
      const name= row.original.FIVEPOST
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'fivepostdays',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Срок доставки 5POST' />
    ),
    cell: ({ row }) => {
      const name= row.original.FIVEPOSTdays
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'courier',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Стоимость доставки курьера' />
    ),
    cell: ({ row }) => {
      const name= row.original.COURIER
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'courierdays',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Срок доставки курьера' />
    ),
    cell: ({ row }) => {
      const name= row.original.COURIERdays
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
    {
      id: 'actions',
      cell: DataTableRowActions,
    },
]