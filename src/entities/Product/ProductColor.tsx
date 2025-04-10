"use client"
import { getQueryParamValue } from '@/shared/utils/search-params'
import { useSearchParams } from 'next/navigation'
import s from './Product.module.scss'
import ProductColorsItem, { translate } from './ProductColorsItem'
import ProductFiltersLabel from './ProductFiltersLabel'

const ProductColor = ( {colors, images}: {colors: string[], images: any}) => {
	const searchParams = useSearchParams()
	const getColor = getQueryParamValue(searchParams, 'color')
	const selectedColor = getColor ? translate(getColor)?.toUpperCase() : 'Не выбран'



  return (
		<div>
					<ProductFiltersLabel label='Цвет' selected={selectedColor}/>
					{colors.length && (
						<div className={s.FiltersList}>
							{
								colors.map((color: string, i: number) => 
									{
										return(
											<ProductColorsItem color={color} selectedColor={getColor} key={i} image={images[color][0]}/>
												)
									}
							)}
			</div>
			)}
		</div>
  )
}

export default ProductColor