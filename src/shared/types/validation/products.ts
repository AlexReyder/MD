import { z } from 'zod'

export const FiltersNSpecsDbSchema = z.object({
	label: z.string(),
	value: z.string()
}).array()

export const ManufacturerProductsDbSchema = z.object({
	label: z.string(),
	value: z.string(),
	material: z.object({
		id: z.string(),
		name: z.string()
	}),
	print: FiltersNSpecsDbSchema
}).array()

export type FiltersNSpecDb = z.infer<typeof FiltersNSpecsDbSchema>
export type FiltersNSpecMDb = z.infer<typeof ManufacturerProductsDbSchema>

export const ProductDetailsDbShema = z.record(z.string(),z.record(z.string(), z.string())).array()

export const ProductsDbSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	isActive: z.boolean(),
	isNew:z.boolean(),
	isBestseller:z.boolean(),
	isInStock:z.boolean(),
	articleNumber: z.string(),
	description: z.string(),
	adPrice: z.coerce.number(),
	price: z.coerce.number(),
	images:z.any(),
	details:z.any(),
	category: FiltersNSpecsDbSchema,
	band: FiltersNSpecsDbSchema,
	genre: FiltersNSpecsDbSchema,
	colors: FiltersNSpecsDbSchema,
	sizes: FiltersNSpecsDbSchema,
	manufacturer: z.any(),
	material: FiltersNSpecsDbSchema,
	print: FiltersNSpecsDbSchema,
	country: FiltersNSpecsDbSchema,
	CategoryTable:z.any(),
	ManufacturerTable:z.any(),
	NotifyProducts:z.any().optional(),
	notifyProductsId:z.string().optional(),
	createdAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
})

export type ProductsDb = z.infer<typeof ProductsDbSchema>
export const ValidateProductsDbSchema = z.array(ProductsDbSchema)

export const ProductsDbAddSchema = z.object({
				id: z.string().default(''),
				name:z.string().nonempty({message:'Обязательное поле.'}).default(''),
				isActive:z.boolean().default(true),
				isInStock:z.boolean().default(true),
				articleNumber:z.string().nonempty({message: 'Обязательно поле'}),
				description:z.string().nonempty({message:'Обязательное поле.'}),
				adPrice:z.coerce.number().min(1, {message: 'Обязательно поле'}),
				price:z.coerce.number().min(1, {message: 'Обязательно поле'}),
				images:z.any(),
				details:z.any(),
				category: FiltersNSpecsDbSchema.length(1,{message: 'Обязательно поле'}),
				band:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				genre:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				manufacturer:z.any(),
				// manufacturer:ManufacturerProductsDbSchema,
				// manufacturer:FiltersNSpecsDbSchema.length(1,{message: 'Обязательно поле'}),
				colors:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				sizes:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				material: FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				print: FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				country: FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				labelAd: z.string().default('none'),
})

export type ProductsDbAdd= z.infer<typeof ProductsDbAddSchema>
export const ValidateProductsDbAdd = z.array(ProductsDbAddSchema)