"use client"
import { getQueryParamValue } from '@/shared/utils/search-params'
import { useSearchParams } from 'next/navigation'
import slug from 'slug'
import s from './Product.module.scss'
import ProductColorsItem from './ProductColorsItem'
import ProductFiltersLabel from './ProductFiltersLabel'

const ProductColor = ( {colors, images}: {colors: string[], images: any}) => {
	const searchParams = useSearchParams()
	const getColor = getQueryParamValue(searchParams, 'color') as string
	const selectedColor = getColor ? matchColor(colors, getColor): 'Не выбран'
  return (
		<div>
					<ProductFiltersLabel label='Цвет' selected={selectedColor}/>
					{colors.length && (
						<div className={s.FiltersList}>
							{
								colors.map((color: string, i: number) => 
									{
										return(
											<ProductColorsItem color={color} selectedColor={getColor} key={i} image={images[slug(color)][0].url}/>
												)
									}
							)}
			</div>
			)}
		</div>
  )
}

export default ProductColor

export function matchColor(colors: string[] , colorCompare:string): string{
	let finded = ''
	colors.forEach((color: string) => {
		if(slug(color) === colorCompare){
			finded = color
		}
	})
	return finded
}