"use client"
import { showCountMessage } from '@/shared/ui'
import { calculateBonusDiscount } from '@/shared/utils/common'
import styles from '@/styles/order-block/index.module.scss'
import Link from 'next/link'

const OrderInfoBlock = ({
  cartData,
  isOrderPage,
  bonusType,
  bonusStatus,
  bonus,
  promocode
}: {
  cartData: any,
  isOrderPage: any,
  bonusType?:any
  bonusStatus?: any
  bonus?: any
  promocode?: any
}) => {
  let itemsQuantity = getItemsQuantity(cartData)
  let itemsTotalPrice = getItemsTOtalPrice(isOrderPage, cartData, bonusStatus, bonus, promocode)

  // useEffect(() => {
  //   itemsQuantity = getItemsQuantity(cartData)
  //   itemsTotalPrice = getItemsTOtalPrice(cartData, bonusStatus, bonus, promocode)
  // }, [promocode])


  return (
    <div className={styles.order_block}>
      <div className={styles.order_block__inner}>
        <p className={styles.order_block__info}>
          {itemsQuantity} 
          {' '}
          {showCountMessage(`${itemsQuantity}`)}
          {' '}
          на сумму
          <span className={styles.order_block__info__text}>
            {itemsTotalPrice} ₽
          </span>
        </p>
        {isOrderPage && (
          <>
            <p className={styles.order_block__info}>
              <span className={styles.order_block__info__text}>
                Программа лояльности: {bonusType}
              </span>
             {bonus > 0 ? ( <span className={styles.order_block__info__text}>
                Списано бонусов: {bonus}
              </span>) : <></>}
              {
                promocode.discount > 0 ?
                (<span className={styles.order_block__info__text}>
                  Промокод: Активирован
                 </span>) : <></>
              }
            </p>
            <p className={styles.order_block__info}>
              {/* {translations[lang].order.payment}:{' '} */}
              <span className={styles.order_block__info__text}>
                {/* {onlinePaymentTab
                  ? translations[lang].order.online_payment
                  : translations[lang].order.upon_receipt} */}
              </span>
            </p>
          </>
        )}
        <p className={styles.order_block__total}>
          <span>Итого: </span>
          <span className={styles.order_block__total__price}>
           {itemsTotalPrice} ₽
          </span>
        </p>
        {isOrderPage ? (
          <button
            className={` ${styles.order_block__btn}`}
            type='submit'
            // disabled={
            //   !isUserAgree || !currentCartByAuth.length || paymentSpinner
            // }
            // onClick={handleMakePayment}
          >
            Оформить заказ
          </button>
        ) : (
          <Link
            href='/order'
            className={styles.order_block__btn} 
            // ${
              // !isUserAgree || !currentCartByAuth.length ? styles.disabled : ''
            
          
          >
           Оформить заказ
          </Link>
        )}
        <label className={styles.order_block__agreement}>
          <input
            className={styles.order_block__agreement__input}
            type='checkbox'
            tabIndex={-1}
            defaultChecked
            // ref={checkboxRef}
            // onChange={handleAgreementChange}
            // checked={isUserAgree}
          />
          <span className={styles.order_block__agreement__mark} />
          <span
            className={styles.order_block__agreement__checkbox}
            tabIndex={0}
            // onKeyDown={handleTabCheckbox}
          />
          <span className={styles.order_block__agreement__text}>
          Нажимая на кнопку «Оформить заказ», вы даете согласие на обработку 
            <Link
              href='/privacy'
              className={styles.order_block__agreement__link}
            > персональных данных
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}

export default OrderInfoBlock

function getItemsQuantity(arr: any[]){
  let quantity = 0;
  arr.forEach(item => {
    quantity+= +item.quantity
  })
  return quantity;
}

function getItemsTOtalPrice(isOrderPage: boolean, arr: any[], status?: any, bonus: any = 0, promocode?:any){
  let price = 0;
  arr.forEach(item => {
    price+= +item.price * +item.quantity
  })
  if(isOrderPage){
    let total = calculateBonusDiscount(+price, status, +bonus)
    if(promocode.discount > 0){
      total = total - promocode.discount
    }
    return total ;
  }
  return price
}