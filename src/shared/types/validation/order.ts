import { DeliveryType, OrderStatus, PaymentType } from '@prisma/client'
import { z } from 'zod'
import { DeliveryEnum, PaymentEnum } from '../schemas'
import { PromocodeSchema } from './promocode'

export const OrderDbSchema = z.object({
	id: z.string(),
	User: z.any(),
	userId: z.string(),
	payment:z.nativeEnum(PaymentEnum),
	delivery:z.nativeEnum(DeliveryEnum),
	products:z.object({}).array(),
	details:z.object({
		name:z.string(),
		surname:z.string(),
		phone:z.string(),
		email:z.string(),
		comment:z.string(),
	}),
	amount: z.number(),
	trackNumber: z.string().optional(),
	status: z.nativeEnum(OrderStatus),
	Promocode: PromocodeSchema.optional(),
	promocodeId: z.string().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})
export type OrderDb = z.infer<typeof OrderDbSchema>
export const ValidateOrderDbSchema = z.array(OrderDbSchema)

export const OrderDbUpdateSchema = z.object({
	id: z.string(),
	status: z.nativeEnum(OrderStatus),
	trackNumber: z.string().default(''),
})

export type OrderDbUpdate = z.infer<typeof OrderDbUpdateSchema>
export const ValidateOrderDbUpdate = z.array(OrderDbUpdateSchema)

// CLIENT

export const CreateOrderSchema = z.object({
	payment:z.nativeEnum(PaymentType),
	delivery:z.nativeEnum(DeliveryType),
	products:z.any().array(),
	name:z.string().nonempty('Обязательное поле.'),
	surname:z.string().nonempty('Обязательное поле.'),
	phone:z.string().nonempty('Обязательное поле.'),
	email:z.string().nonempty('Обязательное поле.'),
	comment:z.string().default(''),
	promocodeId: z.object({
		id: z.string(),
		discount: z.coerce.number()
	}),
	bonusMinusAmount: z.coerce.number()
})

export type CreateOrder = z.infer<typeof CreateOrderSchema>