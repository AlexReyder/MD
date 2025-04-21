"use client"
import { DataTableColumnHeader } from '@/shared/shadcnui/filter-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/filter-table/data-table-row-actions'
import LongText from '@/shared/shadcnui/long-text'
import { FilterAdmin } from '@/shared/types/schemas'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<FilterAdmin>[] = [
  {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Название' />
    ),
    cell: ({ row }) => {
      const name= row.original.name
      return <LongText className='w-full'>{name}</LongText>
    },
    meta: { className: 'w-full' },
  },
  {
    id: 'material',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Материал' />
    ),
    cell: ({ row }) => {
      const name= row.original?.material?.name
      return <p>{name}</p>
    },
    meta: { className: 'w-full' },
  },
  
  {
    id: 'print',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Принт' />
    ),
    cell: ({ row }) => {
      const name= row.original?.print?.name
      return <p>{name}</p>
    },
    meta: { className: 'w-full' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    
  },
]