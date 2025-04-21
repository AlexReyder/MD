'use client'

import { addProduct } from '@/shared/api/admin/products'
import { Button } from '@/shared/shadcnui/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/shadcnui/ui/form'
import { Input } from '@/shared/shadcnui/ui/input'
import { RadioGroup, RadioGroupItem } from "@/shared/shadcnui/ui/radio-group"
import { Switch } from '@/shared/shadcnui/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/shadcnui/ui/tabs"
import { Textarea } from '@/shared/shadcnui/ui/textarea'
import { IImagesData } from '@/shared/types/file'
import { ProductAdmin } from '@/shared/types/schemas'
import { ProductsDb, ProductsDbAdd, ProductsDbAddSchema } from '@/shared/types/validation/products'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import slug from 'slug'
import { FileUploader } from '../../file-uploader'
import { Label } from '../../ui/label'
import MultipleSelector from '../../ui/multiple-select'

// const formSchema = z
// 	.object({
// 			id: z.string().default(''),
// 			name:z.string().min(6,{message:'Обязательное поле. Минимальная длина 6 символов.'}),
// 			slug:z.string(),
// 			isActive:z.boolean().default(true),
// 			isNew:z.boolean().default(false),
// 			isBestseller:z.boolean().default(false),
// 			isInStock:z.boolean().default(true),
// 			articleNumber:z.string().nonempty({message: 'Обязательно поле'}),
// 			description:z.string().min(6,{message:'Обязательное поле. Минимальная длина 6 символов.'}),
// 			adPrice:z.coerce.number().min(1, {message: 'Обязательно поле'}),
// 			price:z.coerce.number().min(1, {message: 'Обязательно поле'}),
// 			images:z.any(),
// 			details:z.any(),
// 			category: z.any().array().length(1,{message: 'Обязательно поле'}),
// 			band:z.any().array().min(1,{message: 'Обязательно поле'}),
// 			genre:z.any().array().min(1,{message: 'Обязательно поле'}),
// 			manufacturer:z.any().array().length(1,{message: 'Обязательно поле'}),
// 			colors:z.any().array().min(1,{message: 'Обязательно поле'}),
// 			sizes:z.any().array().min(1,{message: 'Обязательно поле'}),
// 			material: z.any(),
// 			print: z.any(),
// 			country: z.any(),
// 			labelAd: z.string().default(''),
// 	})

// export type ProductAddForm = z.infer<typeof formSchema>

interface Props {
	currentRow?: ProductsDb
	open: boolean
	onOpenChange: (open: boolean) => void
	data: any
}

export function ProductActionDialog({currentRow, open, onOpenChange, data}: Props) {
	const isEdit = !!currentRow
	const colorsDetails = isEdit ? currentRow.details: data.colors.map((color) => {return {[color.slug]:{}}});
	const loadImages = isEdit ? currentRow.images : {}
	const [details, setDetails] = useState(colorsDetails)
	const [images, setImages] = useState<IImagesData | {}>(loadImages)
	const labelAdState = currentRow?.isNew ? 'new' : currentRow?.isBestseller ? 'bestseller' : 'none'
	const [labelAd, setLabelAd] = useState(labelAdState)
	const form = useForm<ProductsDbAdd>({
		resolver: zodResolver(ProductsDbAddSchema),
		defaultValues: isEdit
		? {
			...currentRow,
		}
		: {
			id: '',
			name: '',
			isActive: true,
			isInStock: true,
			articleNumber: '',
			description: '',
			adPrice: 0,
			price: 0,
			images,
			details,
			category:[],
			band:[],
			manufacturer:[],
			genre:[],
			sizes:[],
			colors:[],
			material:[],
			print:[],
			country:[]
		},
	})
	form.watch('manufacturer')
	form.watch('colors')
	form.watch('sizes')
	form.watch('material')
	form.watch('print')
	console.log('IMAGES:' ,images)
	console.log(form.getValues())
	
	useEffect(() =>{
			form.setValue('material', [{label:data.manufacturers[0].material.name, value:data.manufacturers[0].material.id}])
			form.setValue('print', [{label:data.manufacturers[0].print.name, value:data.manufacturers[0].print.id}])
			form.setValue('country', [{label:data.countries[0].name, value:data.countries[0].id}])
	},[])

	const onSubmit = async (values: ProductsDbAdd) => {
		values.details = details
		values.images = images
		values.labelAd = labelAd
		const{ success, error} = await addProduct(values)
		const toastMessage = isEdit ? 'Товар успешно изменен' : 'Товар успешно добавлен'
					if(success){
						toast.success(toastMessage)
					}
		
					if(error){
						toast.error('Произошла ошибка')
						console.log(error)
					}
	 onOpenChange(false)		
	}

	const setDataDetails = (e: any) => {
		const color = e.target.attributes['data-color'].nodeValue;
		const currentSize = e.target.name;
		const currentSizeValue = e.target.value
		const prevState = [...details];
		const colorIndex = prevState.findIndex(obj => obj.hasOwnProperty(color));
		prevState[colorIndex][color][currentSize] = currentSizeValue
		setDetails(prevState);
	}

	return (
		<>
		<Dialog
			open={open}
			onOpenChange={(state) => {
				form.reset()
				onOpenChange(state)
			}}
		>
			<DialogContent className='sm:max-w-5xl max-h-9/10 h-full'>
				<DialogHeader className='text-left'>
					<DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">{isEdit ? 'Изменить товар' : 'Добавить новый товар'}</DialogTitle>
				</DialogHeader>
				<div className='-mr-4 h-full w-full overflow-y-auto py-1 pr-4'>
					<Form {...form}>
						<form
							id='product-form'
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 p-0.5'
						>
							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Основное:
   						</h4>
							<IsProductActive form={form}/>
							<ProductName form={form}/>
							<ProductDescription form={form}/>
							<ProductArticle form={form}/>
							<ProductAdPrice form={form}/>
							<ProductPrice form={form}/>
							<ProductLabelAd state={labelAd} setState={setLabelAd}/>

							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Фильтры:
   						</h4>
														<FormTemplateField name='category' form={form}data={data.categories} title='Категория' placeholder='Выберите категорию товара' isEdit={isEdit} maxSelected={1}/>
								
														<FormTemplateField name='band' form={form} data={data.bands} title='Музыкальная группа' placeholder='Выберите музыкальную группу' isEdit={isEdit}/>

														<FormTemplateField name='genre' form={form} data={data.genres} title='Музыкальный стиль' placeholder='Выберите музыкальный стиль' isEdit={isEdit}/>

														<FormTemplateField name='colors' form={form} data={data.colors} title='Доступные цвета' placeholder='Выберите доступные цвета' isEdit={isEdit}/>

														<FormTemplateField name='sizes' form={form} data={data.sizes} title='Доступные размеры' placeholder='Выберите доступные размеры' isEdit={isEdit}/>
												
								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Спецификация:
   							</h4>

								 <FormTemplateField name='manufacturer' form={form} data={data.manufacturers} title='Производитель' placeholder='Выберите промзводителя' isEdit={isEdit} maxSelected={1}/>

								{form.getValues().manufacturer.length > 0 ? 
										<FormTemplateField name='material' form={form} data={data.materials} title='Материал' placeholder='Выберите материал' isEdit={isEdit} maxSelected={1} defaultValue={ [{label:data.manufacturers[0].material.name, value:data.manufacturers[0].material.id}]}/>
										: <></>
								}
								{
									form.getValues().manufacturer.length > 0 && (
										<FormTemplateField name='print' form={form} data={data.prints} title='Принт' placeholder='Выберите принт' isEdit={isEdit} maxSelected={1} defaultValue={ [{label:data.manufacturers[0].print.name, value:data.manufacturers[0].print.id}]}/>
									)
								}

								{
									form.getValues().manufacturer.length > 0 && (
										<FormTemplateField name='country' form={form} data={data.countries} title='Страна производства' placeholder='Выберите страну производства' isEdit={isEdit} maxSelected={1} defaultValue={isEdit ? form.getValues().country : [{label:data.countries[0].name, value:data.countries[0].id}]}/>
									)
								}

								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Остатки:
   							</h4>
									<ProductDetails form={form} setDetails={setDataDetails} details={details}/>
									<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Фотографии:
   							</h4>	
								<ProductImages form={form} images={images} setImages={setImages}/>
						</form>
					</Form>
				</div>
				<DialogFooter>
					<Button type='submit' form='product-form'>
					 Сохранить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
		 <Toaster
				position="bottom-right"
				reverseOrder={false}
				toastOptions={{duration:3000}}
			/>
		</>
	)
}



interface FormTemplateFieldP{
	title: string
	placeholder: string
	name: string
	form: any
	data: any
	isEdit: boolean
	maxSelected?: number
	defaultValue?: any
}

const FormTemplateField = ({form, name, data, title, placeholder, isEdit, maxSelected, defaultValue}: FormTemplateFieldP) => {
	const valueDefault:any = defaultValue ? defaultValue : []
	const items = data.map((item:any) => {return {label:item.name, value:item.id}})

	return(
		<FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
				<FormLabel className='col-span-2 text-right'>
					{title}
				</FormLabel>
				<FormControl>
					<div className='col-span-4'>
				<MultipleSelector
						{...field}
						value={valueDefault.length > 0 ? valueDefault : field.value}
						onChange={(e) => field.onChange(e)}
						maxSelected={maxSelected ? maxSelected : undefined}
						defaultOptions={items}
						placeholder={placeholder}
						hidePlaceholderWhenSelected={true}
					/>
					</div>
				</FormControl>
				<FormMessage className='col-span-4 col-start-3' />
			</FormItem>
			)}
		/>
	)
}

const ProductName = (form: {form: any
}) => {
	return (
		<FormField
		//@ts-ignore:next-line
		control={form.control}
		name='name'
		render={({ field }) => (
			<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
				<FormLabel className='col-span-2 text-right'>
				 Название
				</FormLabel>
				<FormControl>
					<Input
						placeholder='Название товара'
						className='col-span-4'
						autoComplete='off'
						{...field}
					/>
				</FormControl>
				<FormMessage className='col-span-4 col-start-3' />
			</FormItem>
		)}
	/>
	)
}

const ProductDescription = (form: {form: any
}) => {
	return (
		<FormField
		//@ts-ignore:next-line
		control={form.control}
		name='description'
		render={({ field }) => (
			<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
				<FormLabel className='col-span-2 text-right'>
					Описание
				</FormLabel>
				<FormControl>
					<Textarea
						placeholder='Описание товара'
						className='col-span-4'
						autoComplete='off'
						{...field}
					/>
				</FormControl>
				<FormMessage className='col-span-4 col-start-3' />
			</FormItem>
		)}
	/>
	)
}
const ProductArticle = (form: {form: any
}) => {
	return (
		<FormField
		//@ts-ignore:next-line
			control={form.control}
			name='articleNumber'
			render={({ field }) => (
				<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
					<FormLabel className='col-span-2 text-right'>
					 Артикул
					</FormLabel>
					<FormControl>
						<Input
							placeholder='Артикул товара'
							className='col-span-4'
							autoComplete='off'
								{...field}
							/>
						</FormControl>
						<FormMessage className='col-span-4 col-start-3' />
					</FormItem>
				)}
		/>
	)
}
const ProductAdPrice = (form: {form: any
}) => {
	return (
		<FormField
		//@ts-ignore:next-lnie
		control={form.control}
		name='adPrice'
		render={({ field }) => (
			<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
				<FormLabel className='col-span-2 text-right'>
				 Цена товара до скидки
				</FormLabel>
				<FormControl>
					<Input
						type='text'
						placeholder='Цена товара до скидки'
						className='col-span-4'
						autoComplete='off'
						{...field}
					/>
				</FormControl>
				<FormMessage className='col-span-4 col-start-3' />
			</FormItem>
		)}
	/>
	)
}
const ProductPrice = (form: {form: any
}) => {
	return (
		<FormField
		//@ts-ignore:next-lnie
		control={form.control}
		name='price'
		render={({ field }) => (
			<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
				<FormLabel className='col-span-2 text-right'>
				 Цена товара со скидкой
				</FormLabel>
				<FormControl>
					<Input
						type='text'
						placeholder='Цена товара со скидкой'
						className='col-span-4'
						autoComplete='off'
						{...field}
					/>
				</FormControl>
				<FormMessage className='col-span-4 col-start-3' />
			</FormItem>
		)}
	/>
	)
}
const ProductLabelAd = ({state,setState}:{state: any, setState:any
}) => {
	const onChange = (e) => {
		setState(e)
	}

	return (
						<div className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
								<FormLabel className='col-span-2 text-left'>
					Флажок товара
				</FormLabel>
							<RadioGroup defaultValue={state} onValueChange={onChange} className='col-span-4'>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="none" id="option-one" />
										<Label htmlFor="option-one">Не указан</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="new" id="option-two" />
										<Label htmlFor="option-two">Новинка</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="bestseller" id="option-three" />
										<Label htmlFor="option-three">Хит</Label>
									</div>
								</RadioGroup>
						</div>
	)
}

const IsProductActive = (form: {form: any
}) => {
	return (
		<FormField
		//@ts-ignore:next-line
			control={form.control}
			name="isActive"
			render={({ field }) => (
			<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<FormLabel className='col-span-2 text-right'>
					Показывать товар в каталоге
				</FormLabel>
					<div className='col-span-4'>
				<FormControl>
					<Switch
						checked={field.value}
						onCheckedChange={field.onChange}
					/>
				</FormControl>
					</div>
			</FormItem>
			)}	
		/>
	)
}
const ProductDetails = ({details, form, setDetails}: {form: UseFormReturn<ProductAdmin, any>, setDetails: any, details:any
}) => {
	const colorFields = form.getValues().colors;
	const sizeFields = form.getValues().sizes;
	const defValue = (color, size) =>{
		const colorIndex = details.findIndex(obj => obj.hasOwnProperty(color));
		const currentColor = details[colorIndex][color]
		if(currentColor.hasOwnProperty(size)) return currentColor[size]
		return ''
	}
	return(
		<Tabs  className="w-full">
			<TabsList>
				{colorFields.length > 0 ? colorFields.map((color) => <TabsTrigger value={color.value} key={color.value}>{color.label}</TabsTrigger>) : null}
			</TabsList>
			{colorFields.length > 0 ? colorFields.map((color) => <TabsContent value={color.value} key={color.label}>
				{
					sizeFields.map((size) => {
						return(
							<div key={size.value} className='col-span-6 flex gap-2 mb-2'>
								<Label className='text-right font-bold' htmlFor={size.value}>{size.label}</Label>
								<Input
											type='text'
											autoComplete='off'
											data-color={slug(color.label)}
											id={size.value}
											name={size.label}
											value={defValue(slug(color.label), size.label)}
											onChange={setDetails}
									/>
							</div>
						)
					})
				}
			</TabsContent>
		) : null}
	</Tabs>
	)
}
	const ProductImages = ({form, images, setImages}: {form: UseFormReturn<ProductAdmin, any>, images:any, setImages: any
	}) =>{
		const colorFields = form.getValues().colors;
		return(
			<Tabs className="w-full">
			<TabsList>
			{colorFields.length > 0 ? colorFields.map((color) => <TabsTrigger value={color.value} key={color.value}>{color.label}</TabsTrigger>) : null}
			</TabsList>
			{colorFields.length > 0 ? colorFields.map((color) => <TabsContent value={color.value} key={color.label}>
				<div>
				<FileUploader
          value={images}
          onValueChange={setImages}
					diff={slug(color.label)}
          maxFiles={10}
          maxSize={10 * 1024 * 1024}
        />
				</div>
			</TabsContent>
		) : null}

	</Tabs>
		)
	}