import { NavItem } from '@/shared/types/admin'

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Заказы',
    slug:'orders',
    url: '/admin/orders',
    icon: 'order',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Уведомления',
    url: '/admin/notify',
    icon: 'notify',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Товары',
    slug:'products',
    url: '/admin/products',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Пользователи',
    slug:'users',
    url: '/admin/users',
    icon: 'users',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Фильтры',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'filter',
    isActive: true,

    items: [
      {
        title: 'Группы',
        url: '/admin/filters/bands',
        shortcut: ['m', 'm']
      },
      {
        title: 'Музыкальные жанры',
        url: '/admin/filters/genres',
        shortcut: ['m', 'm']
      },
      {
        title: 'Производители',
        url: '/admin/filters/manufacturer',
        shortcut: ['m', 'm']
      },
      {
        title: 'Цвета',
        url: '/admin/filters/colors',
        shortcut: ['m', 'm']
      },
      {
        title: 'Размеры',
        url: '/admin/filters/sizes',
        shortcut: ['m', 'm']
      },
    ]
  },
  {
    title: 'Спецификация',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'property',
    isActive: true,

    items: [
      {
        title: 'Материал',
        url: '/admin/specifications/material',
        shortcut: ['m', 'm']
      },
      {
        title: 'Принт',
        url: '/admin/specifications/print',
        shortcut: ['m', 'm']
      },
      {
        title: 'Страна производства',
        url: '/admin/specifications/country',
        shortcut: ['m', 'm']
      },
    ]
  },
  {
    title: 'Баннеры',
    url: '/admin/ads',
    icon: 'ad',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Промокоды',
    url: '/admin/promocodes',
    icon: 'promocodes',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'FAQ',
    url: '/admin/faq',
    icon: 'faq',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];