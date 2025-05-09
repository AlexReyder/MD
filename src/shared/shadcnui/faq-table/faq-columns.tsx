"use client"
import { DataTableColumnHeader } from '@/shared/shadcnui/faq-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/faq-table/data-table-row-actions'
import LongText from '@/shared/shadcnui/long-text'
import { FAQAdmin } from '@/shared/types/schemas'
import { formatDate } from '@/shared/utils/common'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<FAQAdmin>[] = [
  {
    id: 'question',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Вопрос' />
    ),
    cell: ({ row }) => {
      const question = row.original.question
      return <LongText className='w-full'>{question}</LongText>
    },
    meta: { className: 'w-full' },
  },
  {
    id: 'answer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ответ' />
    ),
    cell: ({ row }) => {
      const answer= row.original.answer
      return <LongText className='w-full'>{answer}</LongText>
    },
    meta: { className: 'w-full' },
  },
  
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Создан' />
    ),
    cell: ({ row }) => {
      const date= row.original.createdAt as Date

      return <div>{formatDate(date)}</div>
    },
    meta: { className: 'w-full' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    
  },
]