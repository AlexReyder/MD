import { BonusType, OrderStatus, Role } from '@prisma/client'
import {
  IconShield,
  IconUsersGroup
} from '@tabler/icons-react'
import { UserStatus } from './schemas'

export interface UserProfileDTO{
  name: string | null
  surname: string | null
  email: string
  phone: string
}

export const bonusStatusAdmin = new Map<BonusType, string>([
  ['BRONZE', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['SILVER', 'bg-neutral-300/40 border-neutral-300'],
  ['GOLD', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'PLATINUM',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

// export const bonusStatusAdminForm = [
//   {
//     label: 'Бронзовый',
//     value: {Bonus: {status: BonusType.BRONZE}},
//   },
//   {
//     label: 'Серебряный',
//     value: {Bonus: {status: BonusType.SILVER}},
//   },
//   {
//     label: 'Золотой',
//     value: {Bonus: {status: BonusType.GOLD}},
//   },
//   {
//     label: 'Платиновый',
//     value: {Bonus: {status: BonusType.PLATINUM}},
//   },
// ]

export const bonusStatusAdminForm = [
  {
    label: 'Бронзовый',
    value:BonusType.BRONZE,
  },
  {
    label: 'Серебряный',
    value:BonusType.SILVER,
  },
  {
    label: 'Золотой',
    value:BonusType.GOLD,
  },
  {
    label: 'Платиновый',
    value:BonusType.PLATINUM,
  },
]


export const userTypes = [
  {
    label: 'ADMIN',
    value: Role.ADMIN,
    icon: IconShield,
  },

  {
    label: 'USER',
    value: Role.USER,
    icon: IconUsersGroup,
  },

] as const

export const orderStatusTypes = [
  {
    label: 'Принят',
    value: OrderStatus.ACCEPT,
    icon: IconShield,
  },

  {
    label: 'Отменен',
    value: OrderStatus.DECLINE,
    icon: IconShield,
  },

  {
    label: 'В ожидании',
    value: OrderStatus.VERIFICATION,
    icon: IconShield,
  },

  {
    label: 'Собирается',
    value: OrderStatus.COLLECT,
    icon: IconShield,
  },
  {
    label: 'Доставлен',
    value: OrderStatus.DELIVERED,
    icon: IconShield,
  },
  {
    label: 'Оплачен',
    value: OrderStatus.PAID,
    icon: IconShield,
  },
  {
    label: 'Отправлен',
    value: OrderStatus.SENT,
    icon: IconShield,
  },


] as const