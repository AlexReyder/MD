import { Input } from '@/shared/ui'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import { DeliveryType, PaymentType } from '@prisma/client'
import s from './Order.module.scss'

const OrderDetailsForm = ({ register, errors, deliveryType, paymentType }:{ register:any, errors:any, deliveryType: DeliveryType, paymentType: PaymentType }) => {
  let name = ''
  if(deliveryType === 'MAILRUSSIA'){
    name = 'Почтовый адрес'
  }
  if(deliveryType === 'YANDEX' || deliveryType === 'FIVEPOST' || deliveryType === 'CDEK'){
    name = 'Адрес пункта выдачи'
  }
  if(deliveryType === 'COURIER'){
    name = 'Адрес доставки'
  }

  return (
    <div className={s.OrderDetailsForm}>
      <div className={s.OrderDetailsForm__Inner}>
      <Input registerName='name' register={register} errors={errors.name} type='text' placeholder='Имя' />
      <Input registerName='surname' register={register} errors={errors.surname} type='text' placeholder='Фамилия' />
      <Input registerName='phone' register={register} errors={errors.phone} type='text' placeholder='Номер телефона' />
      {paymentType !== 'DEFFERED' ? (
         <Input registerName='address' register={register} errors={errors.address} type='text' placeholder={name} />
      ) : null} 
       <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
      </div>
      <Textarea registerName='comment' register={register} errors={errors.comment} placeholder='Комментарий к заказу' />
    </div>
  )
}

export default OrderDetailsForm