
import { addProductToCart } from '@/shared/api/cart'
import { formatPrice } from '@/shared/utils/common'
import ProductAvailable from '@/widgets/Products/ProductAvailable'
import Image from 'next/image'
import Link from 'next/link'
import slug from 'slug'
import s from './CatalogCardItem.module.scss'



export const CatalogCardItem = ({ item }: any) => {
  let {id, name, category, price, images, colors, sizes, isNew, isBestseller, articleNumber, isInStock} = item;
  const nameSlug = slug(name)     
  colors = slug(colors[0].label)
  sizes = sizes[0].label
  images = images[`${colors}`][0].url
  category = slug(category[0].label)
  
  async function onSubmit() {
          const data = {
            productId: id,
            name,
            price: `${price}`,
            color: item.colors[0].label,
            size: sizes,
            image:images,
            quantity: '1'
          }
          console.log(data)
          const error = await addProductToCart(data)
          // setError(error)
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
            href={`/catalog/${category}/${nameSlug}?color=${colors}`}
            className={s.Img}
          >
            <Image src={images} alt={name} fill style={{objectFit:'scale-down'}} />
          </Link>
          <div className={s.Inner}>
            <h3 className={s.Title}>
              <Link href={`/catalog/${category}/${nameSlug}?color=${colors}`}>
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

