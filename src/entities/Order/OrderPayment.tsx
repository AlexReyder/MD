import { FormRadio } from '@/shared/ui/Form/FormRadio'
import styles from '@/styles/order/index.module.scss'


const OrderPayment = ({register}: {register:any}) => {


  return (
    <div className={styles.order__list__item__payment}>

      <div className={styles.order__list__item__payment__inner}>
          <div
            className={styles.order__list__item__payment__content}
          >
            <p className={styles.order__list__item__payment__content__advice}
              >Выберите способ оплаты товара</p>
            <FormRadio register={register} registerName='payment' text ={'Переводом'} value='TRANSFER' id='payment-1' defaultChecked name='payment-group'/>
            <FormRadio register={register} registerName='payment' text ={'При получении'} value='DEFFERED' id='payment-2' name='payment-group'/>
          </div>
      </div>
    </div>
  )
}

export default OrderPayment