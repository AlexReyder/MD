
import { addProductToCart } from '@/shared/api/cart'
import { ProductsDb } from '@/shared/types/validation/products'
import { formatPrice } from '@/shared/utils/common'
import ProductAvailable from '@/widgets/Products/ProductAvailable'
import Image from 'next/image'
import Link from 'next/link'
import slug from 'slug'
import s from './CatalogCardItem.module.scss'



export const CatalogCardItem = ({ item }: {item: ProductsDb}) => {
  let {id, name, price, images, categoryFilter, colorsFilter, colors, sizes, isNew, isBestseller, articleNumber, isInStock} = item;

  const nameSlug = slug(name)     
  const categoryName = categoryFilter[0]
  const firstColor = colorsFilter[0]
  const previewImage = images[firstColor][0].url

  async function onSubmit() {
          const data = {
            productId: id,
            name,
            price: `${price}`,
            color: colors[0].label,
            size: sizes[0].label,
            image: previewImage,
            quantity: '1'
          }
          await addProductToCart(data)
        }

  return (
        <li className={s.Item}>
          {isNew || isBestseller  ? (
            <span
              className={`${s.Label} ${
                isNew
                  ? s.New
                  : s.Bestseller
              }`}
            >
              {isNew
                ? 'Новинка'
                : 'Хит'}
            </span>
          ) : (
            <></>
          )} 
          <Link
            href={`/catalog/${categoryName}/${nameSlug}?color=${firstColor}`}
            className={s.Img}
          >
            <Image src={previewImage} alt={name} fill style={{objectFit:'scale-down'}} />
          </Link>
          <div className={s.Inner}>
            <h3 className={s.Title}>
              <Link href={`/catalog/${categoryName}/${nameSlug}?color=${firstColor}`}>
                {name}
              </Link>
            </h3>
            <ProductAvailable
              vendorCode={articleNumber}
              isInStock = {isInStock}
            />
            <span className={s.Price}>
              {formatPrice(+price)} ₽
            </span>
          </div>
            <button
              className={` ${s.Cart}`}
              onClick={onSubmit}
            >
							В корзину
            </button>
          {/* )} */}
        </li>
  )
}

