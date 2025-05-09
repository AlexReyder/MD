"use client"
import LongText from '@/shared/shadcnui/long-text'
import { DataTableColumnHeader } from '@/shared/shadcnui/product-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/product-table/data-table-row-actions'
import { ProductsDb } from '@/shared/types/validation/products'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<ProductsDb>[] = [
  {
    id: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Активна' />
    ),
    cell: ({ row }) => {
      const isActive = row.original.isActive
      return <LongText className='max-w-36'>{isActive ? 'Да' : 'Нет'}</LongText>
    },
    meta: { className: 'w-18' },
  },
  {
    accessorKey:'name',
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Название' />
    ),
    cell: ({ row }) => {
      const name= row.original.name
      return <LongText className='max-w-36'>{name}</LongText>
    },
    enableSorting: false,
    meta: { className: 'w-36' },
  },
  {
    accessorKey:'articleNumber',
    id: 'articleNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Артикул' />
    ),
    cell: ({ row }) => {
      const name= row.original.articleNumber
      return <LongText className='max-w-36'>{name}</LongText>
    },
    enableSorting: false,
    meta: { className: 'w-36' },
  },
  {
    id: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Описание' />
    ),
    cell: ({ row }) => {
      const description= row.original.description
      return <LongText className='max-w-36'>{description}</LongText>
    },
    
    meta: { className: 'w-36' },
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Категория' />
    ),
    cell: ({ row }) => {
      const category= row.original.category[0].label
      return <LongText className='max-w-36'>{category}</LongText>
    },
    enableHiding: false,
    enableSorting: true,
    enableColumnFilter: true,
     filterFn: (row, id, value) => {
      return row.original.category[0].label === value
    },
    meta: { className: 'w-36', filterVariant: 'selectProductCategory' },
  },
  {
    id: 'adPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Цена до скидки' />
    ),
    cell: ({ row }) => {
      const adPrice = row.original.adPrice
      return <LongText className='max-w-36'>{adPrice}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Цена' />
    ),
    cell: ({ row }) => {
      const price = row.original.price
      const strPrice = JSON.stringify(price)
      const replaceOnePrice = strPrice.replace('{', '').replace('}', '')
      return <LongText className='max-w-36'>{replaceOnePrice}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'bands',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Группы' />
    ),
    cell: ({ row }) => {
      let bands: string[] = []
      const bandArr = row.original.band.forEach((band: any) => bands.push(band.label))
      const bandStr = bands.join(',')
      return <LongText className='max-w-36'>{bandStr}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'genres',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Жанры' />
    ),
    cell: ({ row }) => {
      let genres: string[] = []
      const genreArr = row.original.genre.forEach((genre: any) => genres.push(genre.label))
      const genreStr = genres.join(',')
      return <LongText className='max-w-36'>{genreStr}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'manufacturer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Производитель' />
    ),
    cell: ({ row }) => {
      const manufacturer = row.original.manufacturer.length > 0 ? row.original.manufacturer[0].label : ''
      return <LongText className='max-w-36'>{manufacturer}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'colors',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Цвета' />
    ),
    cell: ({ row }) => {
      let colors: string[] = []
      const colorsArr = row.original.colors.forEach((color: any) => colors.push(color.label))
      const colorStr = colors.join(',')
      return <LongText className='max-w-36'>{colorStr}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'sizes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Размеры' />
    ),
    cell: ({ row }) => {
      let sizes: string[] = []
      const colorsArr = row.original.sizes.forEach((size: any) => sizes.push(size.label))
      const sizesStr = sizes.join(', ')
      return <LongText className='max-w-36'>{sizesStr}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'material',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Материал' />
    ),
    cell: ({ row }) => {
      const material = row.original.material.length > 0 ? row.original.material[0].label : ''
      return <LongText className='max-w-36'>{material}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'print',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Принт' />
    ),
    cell: ({ row }) => {
      const print = row.original.print.length > 0 ? row.original.print[0].label : ''
      return <LongText className='max-w-36'>{print}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    id: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Страна' />
    ),
    cell: ({ row }) => {
      const country = row.original.country[0].label
      return <LongText className='max-w-36'>{country}</LongText>
    },
    meta: { className: 'w-36' },  
  },
  {
    accessorKey: 'createdAt',
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
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]