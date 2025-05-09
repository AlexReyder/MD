import { BonusType } from '@prisma/client'
import { z } from 'zod'

export enum BonusesTypeEnum {
	ADD = 'ADD',
	MINUS = 'MINUS',
}

export const DynamicBonusesSchema = z.object({
	type:z.nativeEnum(BonusesTypeEnum),
	title: z.string(),
	amount:z.number(),
	expiresAt:z.coerce.date(),
	createdAt:z.coerce.date()
})

export const BonusHistorySchema = z.object({
	type:z.nativeEnum(BonusesTypeEnum),
	title: z.string(),
	amount:z.number(),
	expiresAt:z.coerce.date().nullable(),
	createdAt:z.coerce.date()
})

export type BonusHistoryType = z.infer<typeof BonusHistorySchema>
export type DynamicBonusesType = z.infer<typeof DynamicBonusesSchema>

export const BonusDbSchema = z.object({
	id: z.string(),
	amount: z.number(),
	status: z.nativeEnum(BonusType),
	history: BonusHistorySchema.array(),
	dynamicBonuses: DynamicBonusesSchema.array(),
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

export interface BonusHistoryItem{
	type: 'add' | 'minus'
}
// export const PromocodeAddSchema = z.object({
// 	id: z.string().default(''),
// 	value: z.string().nonempty({message: 'Обязательное поле.'}),
// 	discount: z.coerce.number().min(1, {message: 'Обязательное поле.'}),
// 	expiresAt: z.coerce.date({ required_error: 'Обязательное поле'}),
// })

// export type PromocodeAdd = z.infer<typeof PromocodeAddSchema>