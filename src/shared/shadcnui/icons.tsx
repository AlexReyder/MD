import {
	IconAd,
	IconAlignLeft2,
	IconBellRinging,
	IconBrandProducthunt,
	IconBubblePlus,
	IconDiscount,
	IconEdit,
	IconFilter,
	IconLayoutDashboard,
	IconProps,
	IconShoppingBag,
	IconTruckDelivery,
	IconUser
} from '@tabler/icons-react'

export type Icon = React.ComponentType<IconProps>;

export const Icons = {
  dashboard: IconLayoutDashboard,
	filter: IconFilter,
	users: IconUser,
	product: IconBrandProducthunt,
	order: IconShoppingBag,
	property: IconAlignLeft2,
	ad: IconAd,
	faq:IconBubblePlus,
	promocodes: IconDiscount,
	notify: IconBellRinging,
	content: IconEdit,
	delivery: IconTruckDelivery
};