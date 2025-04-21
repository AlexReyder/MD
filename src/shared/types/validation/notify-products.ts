import { z } from 'zod'

// ADMIN
export const NotifyProductsSchema = z.object({
	id: z.string(),
	User: z.any(),
	userId: z.string(),
	isNotified: z.boolean(),
	Product:z.object({
		name: z.string(),
		articleNumber: z.string()
	}),
	productId: z.string(),
	color: z.string(),
	size: z.string(),
	createdAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
})

export type NotifyProductsDb = z.infer<typeof NotifyProductsSchema>
export const ValidateNotifyProductsSchema = z.array(NotifyProductsSchema)

export const NotifyProductsMailSchema = z.object({
	id: z.string(),
	User: z.any(),
	mailTitle: z.string().nonempty({message: 'Обязательное поле.'}),
	mailBody:  z.string().nonempty({message: 'Обязательное поле.'}),
})

export type NotifyProductsMail = z.infer<typeof NotifyProductsMailSchema>
export const ValidateNotifyProductsMail = z.array(NotifyProductsMailSchema)

// CLIENT

export const CreateNotifyProductsSchema = z.object({
	productId: z.string(),
	color: z.string(),
	size: z.string(),
})

export type CreateNotifyProducts = z.infer<typeof CreateNotifyProductsSchema>
export const ValidateCreateNotifyProducts  = z.array(CreateNotifyProductsSchema)