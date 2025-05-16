
import { ProductsDb } from '@/shared/types/validation/products'
import ProductAvailable from '@/widgets/Products/ProductAvailable'
import s from './Product.module.scss'
import ProductAttentionLabel from './ProductAttentionLabel'
import ProductDescription from './ProductDescription'
import ProductForm from './ProductForm'
import ProductImages from './ProductImages'
import { ProductPrice } from './ProductPrice'
import ProductSpecification from './ProductSpecification'
import { ProductTable } from './ProductTable'

export const Product = ({product}: {product: ProductsDb}) => {

  let { id, isBestseller, isNew,name, description, colors, sizes, details, images, price, material, manufacturer, print, country, category, articleNumber, isInStock, adPrice } = product

  let colorsInfo = colors.map((color) => `${color.label}`)
  let sizesInfo = sizes.map((size) => `${size.label}`) 

  let materialInfo = material.length > 0 ? material[0].label : null
  let manufacturerInfo = manufacturer.length > 0 ? manufacturer[0].label : null 
  let printInfo = print.length > 0 ? print[0].label : null 
  let countryInfo = country[0].label
  let categoryLabel = category[0].label
  let defaultPrice = price[sizes[0].label]
  
  const specifications = {
    material: materialInfo,
    manufacturer: manufacturerInfo,
    print: printInfo,
    country: countryInfo
  }

	return(
			 <div className={s.ProductContainer}>
        <ProductImages images={images} className={s.ProductImages}/>
        <ProductTable className={s.ProductTable} category={categoryLabel} manufacturer = {manufacturerInfo}/>
        <div className={s.ProductContent}>
        <ProductAttentionLabel isBestseller={isBestseller} isNew={isNew}/>
          <h1 className={s.ProductTitle}>{name}</h1>
          <ProductPrice defaultPrice={defaultPrice} price={price} adPrice={adPrice}/>
          <div className={s.ProductAvailable}>
            <ProductAvailable
              vendorCode={articleNumber}
              isInStock={isInStock}
            />
          </div>
          <ProductForm productId={id} name={name} colors={colorsInfo} sizes={sizesInfo} details={details} images={images} price={price} material={materialInfo} articleNumber={articleNumber} oColors = {product.colors} colorsFilter={product.colorsFilter}/>
          <div className={s.BottomContainer}>
            <ProductDescription description={description}/>
            <ProductSpecification specifications = {specifications}/>
          </div>
        </div>
      </div>
	)	
}