"use client"
import { Input } from '@/shared/ui'
import s from './PromotionalCode.module.scss'

const PromotionalCode = ({register, errors}:{register:any, errors:any}) => {
 return (
    <div className={s.PromotionalCode}>
      <p className={s.Text}>Чтобы воспользоваться скидкой введите промокод</p>
       <Input registerName='promocode' register={register} errors={errors.promocode} type='text' placeholder='Промокод' />
    </div>
  )
}

export default PromotionalCode