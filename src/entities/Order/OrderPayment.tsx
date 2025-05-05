import { FormRadio } from '@/shared/ui/Form/FormRadio'
import s from './OrderPayment.module.scss'

const OrderPayment = ({register}: {register:any}) => {


  return (
    <div className={s.Payment}>

      <div className={s.Payment_inner}>
          <div
            className={s.Payment_content}
          >
            <p className={s.Payment_content__advice}
              >Выберите способ оплаты товара</p>
            <FormRadio register={register} registerName='payment' text ={'Переводом'} value='TRANSFER' id='payment-1' defaultChecked name='payment-group'/>
            <FormRadio register={register} registerName='payment' text ={'При получении'} value='DEFFERED' id='payment-2' name='payment-group'/>
          </div>
      </div>
    </div>
  )
}

export default OrderPayment