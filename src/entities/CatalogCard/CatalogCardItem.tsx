
import { addProductToCart } from '@/shared/api/cart'
import { formatPrice } from '@/shared/utils/common'
import ProductAvailable from '@/widgets/Products/ProductAvailable'
import Image from 'next/image'
import Link from 'next/link'
import s from './CatalogCardItem.module.scss'



export const CatalogCardItem = ({ item }: any) => {
  const {id, name, price, images, colors, sizes} = item;
  async function onSubmit() {
          const data = {
            productId: id,
            name,
            price: `${price}`,
            color: colors[0],
            size: sizes[0],
            image:images[colors[0]][0],
            quantity: '1'
          }
          const error = await addProductToCart(data)
          // setError(error)
        }

  return (
        <li className={s.Item}>
          {item.isNew || item.isBestseller  ? (
            <span
              className={`${s.Label} ${
                item.isNew
                  ? s.New
                  : s.Bestseller
              }`}
            >
              { item.isNew
                ? 'Новинка'
                : 'Хит'}
            </span>
          ) : (
            <></>
          )} 
          <Link
            href={`/catalog/${item.categorySlug}/${item.id}?color=${item.colors[0]}`}
            className={s.Img}
          >
            <Image src={`/${item.images.black[0]}`} alt={''} fill style={{objectFit:'scale-down'}} />
          </Link>
          <div className={s.Inner}>
            <h3 className={s.Title}>
              <Link href={`/catalog/${item.categorySlug}/${item.id}?color=${item.colors[0]}`}>
                {'Товар ' + item.bandName}
              </Link>
            </h3>
            <ProductAvailable
              vendorCode={item.articleNumber}
              isInStock = {item.isInStock}
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

