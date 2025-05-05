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
import { FiltersNSpecDb, ProductsDb, ProductsDbAdd, ProductsDbAddSchema } from '@/shared/types/validation/products'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import slug from 'slug'
import { FileUploader } from '../../file-uploader'
import { Label } from '../../ui/label'
import MultipleSelector from '../../ui/multiple-select'

interface Props {
	currentRow?: ProductsDb
	open: boolean
	onOpenChange: (open: boolean) => void
	data: any
}

export function ProductActionDialog({currentRow, open, onOpenChange, data}: Props) {
	const isEdit = !!currentRow
	const loadImages = isEdit ? currentRow.images : {}
	const [images, setImages] = useState<IImagesData | {}>(loadImages)
	const labelAdState = currentRow?.isNew ? 'new' : currentRow?.isBestseller ? 'bestseller' : 'none'
	const [labelAd, setLabelAd] = useState(labelAdState)
	const [appropriateMaterial, setAppropriateMaterial] = useState<any>(undefined) 
	const [appropriatePrint, setAppropriatePrint] = useState<any>(undefined) 
	const [isPending, startTransition] = useTransition();

	const createDefaultPrices = useCallback(() => {
		return data.sizes.reduce((acc: any, cur: any) => ({ ...acc, [cur.name]: 0 }), {})
	}, [])

	const createDefaultDetails = useCallback(() => {
		return data.colors.reduce((acc: any, cur: any) => ({...acc, [cur.slug]: createDefaultPrices()}), {})
	}, [])

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
			price: createDefaultPrices(),
			images,
			details: createDefaultDetails(),
			category:[],
			band:[],
			manufacturer:[],
			genre:[],
			sizes:[],
			colors:[],
			material:[],
			print:[],
			country:[],
			categoryFilter:[],
			bandFilter:[],
			genreFilter:[],
			colorsFilter:[],
			sizesFilter:[],
			manufacturerFilter:[],
			materialFilter:[],
			printFilter:[],
			countryFilter:[],
		},
	})

	const formColors = form.watch('colors')
	const formSizes = form.watch('sizes')
	const formDetails = form.watch('details')
	console.log(form.getValues())
	const formManufacturer = form.watch('manufacturer')

	useEffect(() =>{
		const formValues = form.getValues()
			if(formValues.country.length === 0){
				form.setValue('country', [{label:data.countries[0].name, value:data.countries[0].slug}])
			}

			if(form.getValues().manufacturer.length > 0) {
				const manufacturer = data.manufacturers.filter((manufacturer: any) => manufacturer.name === formManufacturer[0].label)
				startTransition(() => {
				setAppropriateMaterial(manufacturer[0].material)
				setAppropriatePrint(manufacturer[0].print)
				const getValues = form.getValues()
				if(getValues.material.length === 0 && 
					 getValues.print.length === 0  
					//  getValues.country.length === 0
					) {
							form.setValue('material', [
								{
									label:manufacturer[0].material.name,
									value:manufacturer[0].material.slug}
							])
			
							form.setValue('print', [
								{
									label:manufacturer[0].print.name,
									value:manufacturer[0].print.slug}
							])
			
					 }
				})
			}

			if(form.getValues().manufacturer.length === 0){
				setAppropriateMaterial(undefined)
				setAppropriatePrint(undefined)
				form.setValue('material', [])
				form.setValue('print', [])
			}

			if(form.getValues().sizes.length > 0){
				startTransition(() => {
					const nonZeroPrices = form.getValues().sizes.reduce((acc, cur) => ({ ...acc, [cur.label]: form.getValues().price?.[cur.label] ?? 0 }), {});
					form.setValue('price', nonZeroPrices)
				})
			}

			if( formValues.colors.length > 0 && formValues.sizes.length > 0) {
				startTransition(() => {
					const nonZeroDetails = form.getValues().colors.reduce((accColor, curColor) => ({ ...accColor, [slug(curColor.label)]: form.getValues().sizes.reduce((accSize, curSize) => ({ ...accSize, [curSize.label]: form.getValues().details?.[slug(curColor.label)]?.[curSize.label] ?? 0 }), {}) }), {});
					form.setValue('details', nonZeroDetails)
				})
			}


	},[formManufacturer, formColors, formSizes, formDetails])

	const onSubmit = async (values: ProductsDbAdd) => {
		values.images = images
		values.labelAd = labelAd
		values.categoryFilter = values.category.map((item) => item.value)
		values.bandFilter = values.band.map((item) => item.value)
		values.genreFilter = values.genre.map((item) => item.value)
		values.colorsFilter = values.colors.map((item) => item.value)
		values.sizesFilter = values.sizes.map((item) => item.value)
		values.manufacturerFilter = values.manufacturer.map((item: any) => item.value)
		values.materialFilter = values.material.map((item) => item.value)
		values.printFilter = values.print.map((item) => item.value)
		values.countryFilter = values.country.map((item) => item.value)
		console.log(values)
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

	return (
		<>
		<Dialog
			open={open}
			onOpenChange={(state) => {
				form.reset()
				onOpenChange(state)
			}}
		>
			<DialogContent className='sm:max-w-19/20 max-w-19/20  h-19/20 overflow-y-auto'>
				<DialogHeader className='text-left'>
					<DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">{isEdit ? 'Изменить товар' : 'Добавить новый товар'}</DialogTitle>
				</DialogHeader>
				<div className='-mr-4 h-full w-full  py-1 pr-4'>
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
							{/* <ProductPrice form={form}/> */}
							<ProductLabelAd state={labelAd} setState={setLabelAd}/>

							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Фильтры:
   						</h4>
							<FormTemplateField name='category' form={form}data={data.categories} title='Категория' placeholder='Выберите категорию товара' isEdit={isEdit} maxSelected={1}/>
								
							<FormTemplateField name='band' form={form} data={data.bands} title='Музыкальная группа' placeholder='Выберите музыкальную группу' isEdit={isEdit}/>

							<FormTemplateField name='genre' form={form} data={data.genres} title='Музыкальный стиль' placeholder='Выберите музыкальный стиль' isEdit={isEdit}/>

							<FormTemplateField name='colors' form={form} data={data.colors} title='Доступные цвета' placeholder='Выберите доступные цвета' isEdit={isEdit}/>

							<FormTemplateField name='sizes' form={form} data={data.sizes} title='Доступные размеры' placeholder='Выберите доступные размеры' isEdit={isEdit}/>
							{
								form.getValues().sizes.length > 0 && (
									<>
										<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
										Стоимость:
										</h4>
										<ProductPrices form={form}/>
									</>
								)
							}

												
							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
									Спецификация:
   						</h4>

							<FormTemplateField name='manufacturer' form={form} data={data.manufacturers} title='Производитель' placeholder='Выберите промзводителя' isEdit={isEdit} maxSelected={1}/>

								{appropriateMaterial && (
									<FormTemplateField name='material' form={form} data={data.materials} title='Материал' placeholder='Выберите материал' isEdit={isEdit} maxSelected={1} defaultValue={ [{label:appropriateMaterial?.name, value:appropriateMaterial?.slug}]}/>
								)
										
								}
								{
									appropriatePrint && (
										<FormTemplateField name='print' form={form} data={data.prints} title='Принт' placeholder='Выберите принт' isEdit={isEdit} maxSelected={1} defaultValue={ [{label:appropriatePrint?.name, value:appropriatePrint?.slug}]}/>
									)
								}

								<FormTemplateField name='country' form={form} data={data.countries} title='Страна производства' placeholder='Выберите страну производства' isEdit={isEdit} maxSelected={1} defaultValue={isEdit ? form.getValues().country : [{label:data.countries[0].name, value:data.countries[0].slug}]}/>
									
								{
								form.getValues().colors.length > 0 && form.getValues().sizes.length > 0 ? (
									<>
										<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
										Остатки:
									</h4>
										<ProductDetails form={form}/>
										<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left my-12">
										Фотографии:
									</h4>	
									<ProductImages form={form} images={images} setImages={setImages}/>
									</>
								) : null
								}

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
	form: UseFormReturn<ProductsDbAdd, any, ProductsDbAdd>
	data: any
	isEdit: boolean
	maxSelected?: number
	defaultValue?: any
}

const FormTemplateField = ({form, name, data, title, placeholder, isEdit, maxSelected, defaultValue}: FormTemplateFieldP) => {
	const valueDefault:any = defaultValue ? defaultValue : []
	const items = data.map((item:any) => {return {label:item.name, value:item.slug}})

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
						value={valueDefault.length > 0 ? !field.value ? valueDefault : field.value : field.value}
						// value={valueDefault.length > 0 ? valueDefault : field.value}
						onChange={(e) => {
							field.onChange(e)
						}}
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
const ProductDetails = ({form}: {form:UseFormReturn<ProductsDbAdd, any, ProductsDbAdd>
}) => {
	const colorFields = form.getValues().colors;
	const sizeFields = form.getValues().sizes;
	console.log(form.formState.errors.details)
	return(
		<Tabs  className="w-full">
			<TabsList className='mb-4 border'>
				{colorFields.length > 0 ? colorFields.map((color) => <TabsTrigger value={color.value} key={color.value} className='data-[state=active]:bg-black data-[state=active]:text-white'>{color.label} цвет</TabsTrigger>) : null}
			</TabsList>
			{colorFields.length > 0 ? colorFields.map((color) => <TabsContent value={color.value} key={color.label}>
				{
					sizeFields.map((size) => {
						const currentSize = size.label
						const currentColor = slug(color.label)
						return (
							<div key={size.value} className='grid grid-cols-6 items-baseline gap-x-4 gap-y-1 space-y-0'>
								<Label className='text-right col-span-2' htmlFor={size.value}>Количество для <span className='font-bold'>{size.label}</span> размера:</Label>
									<FormField 
									control={form.control}
									name={`details.${currentColor}.${currentSize}` as any}
									render={({ field }) => (
									<FormItem className='col-span-4 mb-4 flex flex-col'>
											<FormControl>
													<Input
																type='text'
																autoComplete='off'
																{...field}
														/>
											</FormControl>	
											<FormMessage className='col-span-4 col-start-3' />
											</FormItem>
												)}
										>
							</FormField>

							</div>
						)
					})
				}
			</TabsContent>
		) : null}
		<span className='text-destructive text-sm '>{form.formState.errors.details ? 'Не все поля заполены' : ''}</span>
	</Tabs>
	)
}
const ProductImages = ({form, images, setImages}: {form: UseFormReturn<ProductsDbAdd, any, ProductsDbAdd>, images:any, setImages: any
	}) =>{
		const colorFields = form.getValues().colors;

		return(
			<Tabs className="w-full">
			<TabsList className='mb-4 border'>
			{colorFields.length > 0 ? colorFields.map((color) => <TabsTrigger value={color.value} key={color.value} className='data-[state=active]:bg-black data-[state=active]:text-white'>{color.label}</TabsTrigger>) : null}
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

const ProductPrices = 
({form}: {form: UseFormReturn<ProductsDbAdd, any, ProductsDbAdd>}) =>{
	const sizesFields = form.getValues().sizes;
	const isSizesAvailable = sizesFields && sizesFields.length > 0
	return(
			<div>
			{
			isSizesAvailable ? 
			( 
				sizesFields.map((size: FiltersNSpecDb[0]) => 
					<div key={size.value} className='grid grid-cols-6 items-baseline gap-x-4 gap-y-1 space-y-0'>
							<Label className='text-right col-span-2' htmlFor={size.value}>
												Цена для <span className='font-bold'>{size.label}</span> размера: 
							</Label>
							<FormField 
									control={form.control}
									name={`price.${size.label}` as any}
									render={({ field }) => (
									<FormItem className='col-span-4 mb-4 flex flex-col'>
													<FormControl>
															<Input
																		type='text'
																		autoComplete='off'
																		{...field}
																/>
													</FormControl>	
											<FormMessage className='col-span-4 col-start-3' />
											</FormItem>
												)}
										>
							</FormField>		
					</div>
			 )
			)
			: 
			null}
			</div>
	)
}