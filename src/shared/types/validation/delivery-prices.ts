import { z } from 'zod'
import { DeliveryEnum } from '../schemas'

export const DeliveryPricesDbSchema = z.object({
	id: z.string(),
	deliver:z.nativeEnum(DeliveryEnum),
	price: z.string(),
	createdAt: z.coerce.string(),
	updatedAt: z.coerce.string(),
})
export type DeliveryPricesDb = z.infer<typeof DeliveryPricesDbSchema>
export const ValidateDeliveryPricesDbSchema = z.array(DeliveryPricesDbSchema)

export const UpdateDeliveryPricesSchema = z.object({
	id: z.string().default(''),
	deliver:z.nativeEnum(DeliveryEnum),
	price: z.string(),
})

export type UpdateDeliveryPrices = z.infer<typeof UpdateDeliveryPricesSchema>
