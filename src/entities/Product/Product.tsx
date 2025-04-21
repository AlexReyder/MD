
import { formatPrice } from '@/shared/utils/common'
import styles from '@/styles/product/index.module.scss'
import ProductAvailable from '@/widgets/Products/ProductAvailable'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import s from './Product.module.scss'
import ProductAttentionLabel from './ProductAttentionLabel'
import ProductDescription from './ProductDescription'
import ProductForm from './ProductForm'
import ProductImages from './ProductImages'
import ProductSpecification from './ProductSpecification'
import { ProductTable } from './ProductTable'

export const Product = ({product}: any) => {
  let {id, isBestseller, isNew,name, description, colors, sizes, details, images, price, material, manufacturer, print, country, category} = product
  colors = colors.map((color) => `${color.label}`)
  sizes = sizes.map((size) => `${size.label}`)

  material = material[0].label
  manufacturer = manufacturer[0].label
  print = print[0].label
  country = country[0].label
  category = category[0].label
  
  const specifications = {
    material,
    manufacturer,
    print,
    country
  }

	return(
			 <div className={s.ProductContainer}>
       <Suspense fallback={<Skeleton/>}>
        <ProductImages images={images} className={s.ProductImages}/>
        </Suspense>
        <ProductTable className={s.ProductTable} category={category} manufacturer = {manufacturer}/>
        <div className={s.ProductContent}>
        <ProductAttentionLabel isBestseller={isBestseller} isNew={isNew}/>
          <h1 className={styles.product__top__title}>{name}</h1>
          <div className={styles.product__top__price}>
            <h3 className={styles.product__top__price__title}>
              {formatPrice(price)} ₽
            </h3>
            <div className={styles.product__top__price__inner}>
            </div>
          </div>
          <div className={styles.product__top__available}>
            <ProductAvailable
              vendorCode={product.articleNumber}
              isInStock={product.isInStock}
            />
          </div>
          <ProductForm productId={id} name={name} colors={colors} sizes={sizes} details={details} images={images} price={price} material={material}/>
          <div className={s.BottomContainer}>
            <ProductDescription description={description}/>
            <ProductSpecification specifications = {specifications}/>
          </div>
        </div>
      </div>
	)	
}