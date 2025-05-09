import { DeliveryType, OrderStatus, PaymentType } from '@prisma/client'
import { z } from 'zod'
import { DeliveryEnum, PaymentEnum } from '../schemas'
import { PromocodeSchema } from './promocode'

export const OrderDbSchema = z.object({
	id: z.string(),
	User: z.any().nullable(),
	userId: z.string(),
	payment:z.nativeEnum(PaymentEnum),
	delivery:z.nativeEnum(DeliveryEnum),
	deliveryPrice: z.coerce.number().default(0),
	products:z.any().array(),
	details:z.object({
		name:z.string(),
		surname:z.string(),
		address:z.string(),
		phone:z.string(),
		email:z.string(),
		comment:z.string(),
	}),
	amount: z.number(),
	bonusMinusAmount: z.number(),
	trackNumber: z.string().nullish(),
	status: z.nativeEnum(OrderStatus),
	Promocode: PromocodeSchema.nullish(),
	promocodeId: z.string().nullish(),
	createdAt: z.coerce.string(),
	updatedAt: z.coerce.string(),
})
export type OrderDb = z.infer<typeof OrderDbSchema>
export const ValidateOrderDbSchema = z.array(OrderDbSchema)

export const OrderDbUpdateSchema = z.object({
	id: z.string(),
	status: z.nativeEnum(OrderStatus),
	trackNumber: z.string().default(''),
	deliveryPrice: z.coerce.number(),
	mailTitle: z.string().default(''),
	mailDescription: z.string().default(''),
})

export type OrderDbUpdate = z.infer<typeof OrderDbUpdateSchema>
export const ValidateOrderDbUpdate = z.array(OrderDbUpdateSchema)

// CLIENT

export const CreateOrderSchema = z.object({
	payment:z.nativeEnum(PaymentType),
	delivery:z.nativeEnum(DeliveryType),
	deliveryPrice: z.coerce.number().default(0),
	products:z.any().array(),
	name:z.string().nonempty('Обязательное поле.'),
	surname:z.string().nonempty('Обязательное поле.'),
	address: z.string().optional(),
	phone:z.string().nonempty('Обязательное поле.'),
	email:z.string().nonempty('Обязательное поле.'),
	comment:z.string().default(''),
	promocodeId: z.object({
		id: z.string(),
		discount: z.coerce.number()
	}),
	bonusMinusAmount: z.coerce.number()
}).refine(data => {
	if(data.payment === 'TRANSFER' && data.address === ''){
		return false
	}
	return true
}, {
	message: 'Обязательное поле',
	path:['address']
})

export type CreateOrder = z.infer<typeof CreateOrderSchema>