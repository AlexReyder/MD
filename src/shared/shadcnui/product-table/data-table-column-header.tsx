"use client"
import { Button } from '@/shared/shadcnui/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/shadcnui/ui/dropdown-menu'
import { productCategoryTypes } from '@/shared/types/user'
import { cn } from '@/shared/utils'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  ChevronDownIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { Separator } from '../ui/separator'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }
  if(column.columnDef.meta?.filterVariant === 'selectProductCategory'){
    
        return (
          <div className={cn('flex items-center space-x-2', className)}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='-ml-3 h-8 data-[state=open]:bg-accent'
              >
                <span>{title}</span>
                <ChevronDownIcon className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              {
                productCategoryTypes.map((item) => (
                  <div key={item.label}>
                  <DropdownMenuItem  onClick={() => column.setFilterValue(item.label)}>
                    {item.label}
                  </DropdownMenuItem>
                  <Separator/>
                  </div>
                ))
              }
              <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
                <TrashIcon/>
                    Сбросить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        )
  }

  return (
  <div className={cn('flex items-center space-x-2', className)}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='-ml-3 h-8 data-[state=open]:bg-accent'
              >
                <span>{title}</span>
                {column.getIsSorted() === 'desc' ? (
                  <ArrowDownIcon className='ml-2 h-4 w-4' />
                ) : column.getIsSorted() === 'asc' ? (
                  <ArrowUpIcon className='ml-2 h-4 w-4' />
                ) : (
                  <CaretSortIcon className='ml-2 h-4 w-4' />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                По возрастанию
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                По убыванию
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
   </div>
  )
}