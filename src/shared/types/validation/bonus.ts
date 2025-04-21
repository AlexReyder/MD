import { BonusType } from '@prisma/client'
import { z } from 'zod'

export const BonusDbSchema = z.object({
	id: z.string(),
	amount: z.number(),
	status: z.nativeEnum(BonusType),
	history: z.any(),
	User:z.any(),
	userId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})
export type BonusDb = z.infer<typeof BonusDbSchema>
export const ValidateBonusDbSchema = z.array(BonusDbSchema)

export const BonusDbMinusSchema = z.object({
	id: z.string(),
	amount: z.number(),
	history: z.any(),
})
export type BonusDbMinus = z.infer<typeof BonusDbSchema>


// export const PromocodeAddSchema = z.object({
// 	id: z.string().default(''),
// 	value: z.string().nonempty({message: 'Обязательное поле.'}),
// 	discount: z.coerce.number().min(1, {message: 'Обязательное поле.'}),
// 	expiresAt: z.coerce.date({ required_error: 'Обязательное поле'}),
// })

// export type PromocodeAdd = z.infer<typeof PromocodeAddSchema>