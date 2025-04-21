"use client"
import { DataTableColumnHeader } from '@/shared/shadcnui/ad-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/ad-table/data-table-row-actions'
import LongText from '@/shared/shadcnui/long-text'
import { AdAdmin } from '@/shared/types/schemas'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const columns: ColumnDef<AdAdmin>[] = [
  {
    id: 'alt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Заголовок' />
    ),
    cell: ({ row }) => {
      const alt = row.original.alt
      return <LongText className='w-full'>{alt}</LongText>
    },
    meta: { className: 'w-full' },
  },
  {
    id: 'link',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ссылка' />
    ),
    cell: ({ row }) => {
      const link= row.original.link
      return <Link href={link} target='_blank' className='w-full'>{link}</Link>
    },
    meta: { className: 'w-full' },
  },
  
  {
    id: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Изображение' />
    ),
    cell: ({ row }) => {
      const url= row.original.url

      return <Link href={url} target='_blank' className='w-full'>{url}</Link>
    },
    meta: { className: 'w-full' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    
  },
]