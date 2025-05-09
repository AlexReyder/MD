"use client"
import ProductCounter from '@/features/ProductsListItem/ProductCounter'
import { addProductToCart } from '@/shared/api/cart'
import { makeNotifyProducts } from '@/shared/api/notify'
import { productFormSchema } from '@/shared/types/schemas'
import { Form } from '@/shared/ui'
import { getQueryParamValue } from '@/shared/utils/search-params'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddToCartBtn from './AddToCartBtn'
import s from './Product.module.scss'
import ProductColor from './ProductColor'
import ProductFiltersLabel from './ProductFiltersLabel'
import ProductSize from './ProductSize'
interface Props{
	productId: string,
	name: string
	colors: string[],
	sizes: string[],
	price: Record <string, number>
	images: any
	details: any
	material: string | null
	articleNumber: string
	oColors: any
}
type FormSchema = z.infer<typeof productFormSchema>

const ProductForm = ({productId, name, price, images, colors, sizes, details, material, articleNumber, oColors}: Props) => {

		const [count, setCount] = useState(0)
		const [inStock, setInStock] = useState(1)
		const [colorError, setColorError] = useState('')
		const [sizeError, setSizeError] = useState('')
		const [quantityError, setQauntityError] = useState('')
		const searchParams = useSearchParams()
		const selectedColor = getQueryParamValue(searchParams, 'color') as string
		const selectedSize = getQueryParamValue(searchParams, 'size') as string
		const colorsArray = Object.keys(images)
		const isImages = colorsArray.length > 0
	console.log(oColors)
		useEffect(()=>{
			setCount(0)
			if(selectedSize !== null) {
				const totalCount = details[selectedColor][selectedSize]
				setInStock(totalCount)
			}

		},[selectedColor, selectedSize])

		const {handleSubmit, formState:{ isSubmitting }} = useForm<FormSchema>()

			async function onSubmit() {
				if(!selectedColor){
					setColorError('Выберите цвет')
				}

				if(!selectedSize){
					setSizeError('Выберите размер')
				}

				if(count === 0) {
					setQauntityError('Выберите количество')
				}

				if(inStock !== 0 && count !== 0 && selectedColor && selectedSize){
					const data = {
						productId,
						name,
						price: price[selectedSize],
						image: isImages ? images[selectedColor]["overviews"][0].url : '/img/no-image.png',
						color: oColors.filter((el: any) => el.value === selectedColor)[0].label,
						// color:  matchColor(colors, getColor),
						size: selectedSize,
						quantity: count
					}
					const cart = await addProductToCart(data)
					setColorError('')
					setSizeError('')
					setQauntityError('')
				} else {
					const data = {
						productId,
						name: name,
						articleNumber,
						color: oColors.filter((el: any) => el.value === selectedColor)[0].label,
						size: selectedSize,
					}
					const {success, error} = await makeNotifyProducts(data)
					console.log(data)
					console.log(error)
				}

			}

	return (
		<Form action={handleSubmit(onSubmit)}>
			{material ? <ProductFiltersLabel label='Материал' selected={material}/> : null}
			<ProductColor colors={colors} images={images} error={colorError}/>
			<ProductSize sizes={sizes} details={details} error={sizeError}/>
			{
				inStock !== 0 ? (
					<div>
						<ProductFiltersLabel label='Количество' selected={`${count}`}/>
						<div className={s.BasketContainer}>
						<ProductCounter
									count={+count}
									totalCount={inStock}
									setCount={setCount}
								/>
								{quantityError ? (
												<p className={s.ErrorProductMessage}>{quantityError}</p>
											) : null}
								<AddToCartBtn		className={s.AddToCart}
																text='В корзину'
																handleAddToCart={() => {}}
																addToCartSpinner={false}
																btnDisabled={
																	false
																}
															/>
						</div>
					</div>
				) : (
					<AddToCartBtn		
					className={`${s.AddToCart} ${s.AddToCart__finised}`}								
					text='Уведомить о поступлении'
					handleAddToCart={() => {}}
					addToCartSpinner={false}
					btnDisabled={false}
					/>
				)
			}
		</Form>
	)
}
export default ProductForm