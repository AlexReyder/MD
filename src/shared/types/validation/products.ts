import { z } from 'zod'

export const ProductsPricesSchema = z.record(z.string(), z.coerce.number().min(1, 'Обязательное поле'))

export const ProductsDetailsSchema = z.record(z.string(), z.record(z.string(), z.coerce.number()))

export const ProductImagesSchema = z.object({
	id: z.string(),
	productId: z.string(),
	originals: z.string().array(),
	overviews: z.string().array(),
	thumbnails: z.string().array(),
	preview: z.string(),
})

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
	price: ProductsPricesSchema,
	images:z.any(),
	details: ProductsDetailsSchema,
	category: FiltersNSpecsDbSchema,
	categoryFilter:z.string().array(),
	bandFilter:z.string().array(),
	genreFilter:z.string().array(),
	colorsFilter:z.string().array(),
	sizesFilter:z.string().array(),
	manufacturerFilter:z.string().array(),
	materialFilter:z.string().array(),
	printFilter:z.string().array(),
	countryFilter:z.string().array(),
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
				adPrice:z.coerce.number(),
				price: ProductsPricesSchema,
				images: z.any(),
				details:ProductsDetailsSchema,
				categoryFilter:z.string().array(),
				bandFilter:z.string().array(),
				genreFilter:z.string().array(),
				colorsFilter:z.string().array(),
				sizesFilter:z.string().array(),
				manufacturerFilter:z.string().array(),
				materialFilter:z.string().array(),
				printFilter:z.string().array(),
				countryFilter:z.string().array(),
				category: FiltersNSpecsDbSchema.length(1,{message: 'Обязательно поле'}),
				band:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				genre:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				manufacturer:z.any().array(),
				colors:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				sizes:FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				material: FiltersNSpecsDbSchema,
				print: FiltersNSpecsDbSchema,
				country: FiltersNSpecsDbSchema.min(1,{message: 'Обязательно поле'}),
				labelAd: z.string().default('none'),
})

export type ProductsDbAdd= z.infer<typeof ProductsDbAddSchema>
export const ValidateProductsDbAdd = z.array(ProductsDbAddSchema)