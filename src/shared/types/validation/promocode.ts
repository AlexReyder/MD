import { z } from 'zod'

export const PromocodeSchema = z.object({
	id: z.string(),
	value: z.string(),
	discount: z.number(),
	expiresAt: z.coerce.date(),
	Order: z.any().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
})
export type PromocodeDb = z.infer<typeof PromocodeSchema>
export const ValidatePromocodeSchema = z.array(PromocodeSchema)

export const PromocodeAddSchema = z.object({
	id: z.string().default(''),
	value: z.string().nonempty({message: 'Обязательное поле.'}),
	discount: z.coerce.number().min(1, {message: 'Обязательное поле.'}),
	expiresAt: z.coerce.date({ required_error: 'Обязательное поле'}),
})

export type PromocodeAdd = z.infer<typeof PromocodeAddSchema>