"use client"
import ProductCounter from '@/features/ProductsListItem/ProductCounter'
import { addProductToCart } from '@/shared/api/cart'
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
	price: string
	images: any
	details: any
	material: string
}
type FormSchema = z.infer<typeof productFormSchema>

const ProductForm = ({productId, name, price, images, colors, sizes, details, material}: Props) => {
		const [count, setCount] = useState(0)
		const [inStock, setInStock] = useState(1)
		const searchParams = useSearchParams()
		const selectedColor = getQueryParamValue(searchParams, 'color') as string
		const selectedSize = getQueryParamValue(searchParams, 'size') as string

		useEffect(()=>{
			setCount(0)
			if(selectedSize !== null) {
				const totalCount = details[selectedColor][selectedSize]
				setInStock(totalCount)
			}

		},[selectedSize])


		const {handleSubmit, formState:{ isSubmitting }} = useForm<FormSchema>()

			async function onSubmit() {
				const data = {
					productId,
					name,
					price: `${price}`,
					image:images[selectedColor][0],
					color: selectedColor,
					size: selectedSize,
					quantity: `${count}`
				}
				const error = await addProductToCart(data)
				// setError(error)
			}

	return (
		<Form action={handleSubmit(onSubmit)}>
			<ProductFiltersLabel label='Материал' selected={material}/>
			<ProductColor colors={colors} images={images}/>
			<ProductSize sizes={sizes} details={details}/>
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