"use client"
import { verifyPromocode } from '@/shared/api/promocode'
import { Input } from '@/shared/ui'
import { ChangeEvent } from 'react'
import s from './PromotionalCode.module.scss'

const PromotionalCode = ({register, errors, setPromocodeValue}:{register:any, errors:any, setPromocodeValue: any}) => {

  async function checkPromo(e:ChangeEvent<HTMLInputElement>){
    const {success, error} = await verifyPromocode(e.target.value)
    if(success){
      setPromocodeValue({
        id: success.id,
        discount: success.discount
      })
    } else {
      setPromocodeValue({
        id: '',
        discount: ''
      })
    }
  }

 return (
    <div className={s.PromotionalCode}>
      <p className={s.Text}>Чтобы воспользоваться скидкой введите промокод</p>
       <Input registerName='promocode' register={register} errors={errors.promocode} type='text' placeholder='Промокод' onBlur={checkPromo} />
    </div>
  )
}

export default PromotionalCode