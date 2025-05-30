'use client'
import { CartItem } from '@/shared/types/cart'
import { formatPrice } from '@/shared/utils/common'
import Image from 'next/image'
import s from './OrderCartItem.module.scss'

interface Props{
	item: CartItem,
	position: number,
}

const OrderCartItem = ({ item, position }: Props) => {
	const colorTranslated = item.color
  return (
        <li className={s.list__item}>
          <span className={s.list__item__pos}>
            {position}.
          </span>
          <div className={s.list__item__img}>
            <Image src={item.image} alt={item.name} fill style={{objectFit:'cover'}}/>
          </div>
          <div className={s.list__item__inner}>
            <span className={s.list__item__name}>
              {item.name}
            </span>
            <span className={s.list__item__info}>
              <span>Цвет: </span>
              <span className={s.SelectedFilter}>{colorTranslated}</span>
              
            </span>
            {item.size && (
              <span className={s.list__item__info}>
                <span>Размер: </span>
                <span className={s.SelectedFilter}>{item.size.toUpperCase()}</span>
              </span>
            )}
            <span className={s.list__item__info}>
              <span>Количество: </span>
              <span className={s.SelectedFilter}>{item.quantity} шт.</span>
            </span>
            <span className={s.list__item__info}>
              <span>Сумма: </span>
              <span className={s.SelectedFilter}>{formatPrice(+item.price * +item.quantity)} ₽</span>
            </span>
          </div>
        </li>
  )
}

export default OrderCartItem