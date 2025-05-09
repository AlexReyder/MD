import { z } from 'zod'

export const DeliveryPricesDbSchema = z.object({
	id: z.string(),
	CDEK: z.coerce.number(),
	CDEKdays: z.string(),
	MAILRUSSIA: z.coerce.number(),
	MAILRUSSIAdays: z.string(),
	YANDEX: z.coerce.number(),
	YANDEXdays: z.string(),
	FIVEPOST: z.coerce.number(),
	FIVEPOSTdays: z.string(),
	COURIER: z.coerce.number(),
	COURIERdays: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
})
export type DeliveryPricesDb = z.infer<typeof DeliveryPricesDbSchema>
export const ValidateDeliveryPricesDbSchema = z.array(DeliveryPricesDbSchema)

export const UpdateDeliveryPricesSchema = z.object({
	id: z.string().default(''),
	CDEK: z.coerce.number(),
	CDEKdays: z.string(),
	MAILRUSSIA: z.coerce.number(),
	MAILRUSSIAdays: z.string(),
	YANDEX: z.coerce.number(),
	YANDEXdays: z.string(),
	FIVEPOST: z.coerce.number(),
	FIVEPOSTdays: z.string(),
	COURIER: z.coerce.number(),
	COURIERdays: z.string(),
})

export type UpdateDeliveryPrices = z.infer<typeof UpdateDeliveryPricesSchema>
