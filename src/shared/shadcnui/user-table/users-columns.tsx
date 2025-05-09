"use client"
import { useUsers } from '@/shared/context/users-context'
import LongText from '@/shared/shadcnui/long-text'
import { DataTableColumnHeader } from '@/shared/shadcnui/user-table/data-table-column-header'
import { DataTableRowActions } from '@/shared/shadcnui/user-table/data-table-row-actions'
import { User } from '@/shared/types/schemas'
import { bonusStatusAdmin, bonusStatusAdminForm, userTypes } from '@/shared/types/user'
import { cn } from '@/shared/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey:'id',
    id: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => {
      const id = row.original.id
      return <p className='w-full'>{id}</p>
    },
    meta: { className: 'w-full' },
  },
  {
    accessorKey:'name',
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Имя' />
    ),
    cell: ({ row }) => {
      const name= row.original.name
      return <LongText className='max-w-36'>{name}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'surname',
    id: 'surname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Фамилия' />
    ),
    cell: ({ row }) => {
      const surname = row.original.surname
      return <LongText className='max-w-36'>{surname}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'email',
    id:'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'phone',
    id:'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Номер телефона' />
    ),
    cell: ({ row }) => {
      const phone = row.original.phone ? row.original.phone : 'Отсутствует'
      return (
        <div>{phone}</div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'purchasesAmount',
    id:'purchasesAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Сумма покупок' />
    ),
    cell: ({ row }) => <div>{row.getValue('purchasesAmount')}</div>,
  },
  {
    accessorKey: 'bonusAmount',
    id:'bonusAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Количество бонусов' />
    ),
    cell: ({ row }) => {
      const bonus = row.original.Bonus[0]
      const bonusStaticAmount = bonus.amount
      let dateNow = new Date()
      let dynamicBonusAmounts: number[] = [];
      for (let i = 0; i < bonus.dynamicBonuses.length; i++) {
        if( bonus.dynamicBonuses[i].expiresAt as Date > dateNow ){
          dynamicBonusAmounts.push(bonus.dynamicBonuses[i].amount)
        }
      }
      const bonusDynamicAmount = dynamicBonusAmounts.length > 0 ? dynamicBonusAmounts.reduce((a,c) => a + c) : 0
      return (
        <div>{bonusStaticAmount + bonusDynamicAmount}</div>
      )
    },
  },
  {
    id:'bonusHistory',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='История бонусов' />
    ),
     cell: ({ row }) =>  {
          const { setOpen, setCurrentRow } = useUsers()
          return(
          <Button 
          variant={'outline'} 
          className='w-fit text-nowrap' 
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('userBonusHistory')
          }}>
            Посмотреть
          </Button>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    id:'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Программа лояльности' />
    ),
    cell: ({ row }) => {
      const { status } = row.original.Bonus[0]
      const statusObj = bonusStatusAdminForm.find(({ value }) => value === status)
      const badgeColor = bonusStatusAdmin.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {statusObj?.label}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      // if(!value){
      //   return undefined;
      // }
      return row.original.Bonus[0].status === value
    },
    enableHiding: false,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {className:'', filterVariant: 'selectBonus'}
  },
  {
    accessorKey: 'role',
    id:'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Роль' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const userType = userTypes.find(({ value }) => value === role)

      if (!userType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {userType.icon && (
            <userType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{userType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.role === value
    },
    enableHiding: false,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {className:'', filterVariant: 'selectUserRole'}
    
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    
  },
]