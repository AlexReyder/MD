import { Input } from '@/shared/ui'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import s from './Order.module.scss'

const OrderDetailsForm = ({register, errors}:{register:any, errors:any}) => {

  return (
    <div className={s.OrderDetailsForm}>
      <div className={s.OrderDetailsForm__Inner}>
      <Input registerName='name' register={register} errors={errors.name} type='text' placeholder='Имя' />
      <Input registerName='surname' register={register} errors={errors.surname} type='text' placeholder='Фамилия' />
      <Input registerName='phone' register={register} errors={errors.phone} type='text' placeholder='Номер телефона' />
       <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
      </div>
      <Textarea registerName='comment' register={register} errors={errors.comment} placeholder='Комментарий к заказу' />
    </div>
  )
}

export default OrderDetailsForm