import { showCountMessage } from '@/shared/ui'
import styles from '@/styles/order-block/index.module.scss'
import Link from 'next/link'

const OrderInfoBlock = ({
  cartData,
  isOrderPage,
}: any) => {
  const itemsQuantity = getItemsQuantity(cartData)
  const itemsTotalPrice = getItemsTOtalPrice(cartData, itemsQuantity)


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
              {/* {translations[lang].order.delivery}:{' '} */}
              <span className={styles.order_block__info__text}>
                {/* {pickupTab
                  ? translations[lang].order.pickup_free
                  : translations[lang].order.courier_delivery} */}
              </span>
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

function getItemsTOtalPrice(arr: any[], quantity: number){
  let price = 0;
  arr.forEach(item => {
    price+= +item.price * +item.quantity
  })
  return price;
  // if(arr.length === 1){
  //   return (+arr.quantity) * (+a.price)
  // }
  // return arr.reduce((a,c) => (+a.price * +a.quantity) + (c.price * +c.quantity))
}