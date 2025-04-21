"use client"
import OrderCartItem from '@/entities/Order/OrderCartItem'
import OrderDelivery from '@/entities/Order/OrderDelivery'
import OrderDetailsForm from '@/entities/Order/OrderDetailsForm'
import OrderPayment from '@/entities/Order/OrderPayment'
import OrderTitle from '@/entities/Order/OrderTitle'
import OrderInfoBlock from '@/entities/OrderInfoBlock/OrderInfoBlock'
import PromotionalCode from '@/features/PromotionalCode/PromotionalCode'
import { makeOrder } from '@/shared/api/order'
import { CartItems } from '@/shared/types/cart'
import { bonusStatusAdminForm, UserProfileDTO } from '@/shared/types/user'
import { BonusDb } from '@/shared/types/validation/bonus'
import { CreateOrder, CreateOrderSchema } from '@/shared/types/validation/order'
import { Form, Input, Section } from '@/shared/ui'
import styles from '@/styles/order/index.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeliveryType, PaymentType } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './Order.module.scss'

interface Props{
	cartData: CartItems
	profileData: UserProfileDTO 
  bonusData: BonusDb
}
// type FormSchema = z.infer<typeof makeOrderSchema>

const CartPageTemplate = ({cartData, profileData, bonusData}: Props) => {
  const [promocodeValue, setPromocodeValue] = useState({id:'', discount:0})
  const router = useRouter()
  const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }, watch, getValues, setValue} = useForm<CreateOrder>({
        defaultValues: {
          payment: PaymentType.TRANSFER,
          delivery:DeliveryType.CDEK,
          products: cartData,
          name: profileData.name ?? "",
          surname: profileData.surname ?? "",
          phone: profileData.phone ?? "",
          email: profileData.email ?? "",
          promocodeId: promocodeValue,
          bonusMinusAmount: 0
        },
        resolver: zodResolver(CreateOrderSchema)
      })
  watch('bonusMinusAmount')
  const bonuses = getValues().bonusMinusAmount    
  const bonusType = bonusStatusAdminForm.filter((el) => el.value === bonusData.status)[0].label
  async function onSubmit(data: CreateOrder) {
            const {success, error} = await makeOrder(data)
            if(success){
              router.push(`/order-confirm?order=${success}`)
            }
            if(error){
              console.log(error)
            }
  }

  function setPromocodeData(data:any){
    setPromocodeValue(data)
    setValue('promocodeId', data)
  }

	return(
		<main>
		<Section className={s.Order}>
        <Form className='container' action={handleSubmit(onSubmit)}>
          <div className={styles.order__inner}>
            <div className={styles.order__inner__left}>
              <ul className={`list-reset ${styles.order__list}`}>
                <li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='1'
                    text='Заказ'
                  />
                    <ul
                      className={`list-reset ${styles.order__list__item__list}`}
                    >
                      {cartData.map((item, i: number) => (
                        <OrderCartItem
                          key={item.productId + item.color + item.size}
                          item={item}
                          position={i + 1}
                        />
                      ))}
                    </ul>

                </li>
                <li className={`${styles.order__list__item} order-block`}>
								<OrderTitle
                    orderNumber='2'
                    text='Оплата'
                  />
									 <OrderPayment register={register} />
                </li>
                <li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='3'
                    text='Доставка'
                  />
                  <OrderDelivery register={register}/>
                </li>
                <li className={`${styles.order__list__item} details-block`}>
                  <OrderTitle
                    orderNumber='4'
                    text='Данные получателя'
                  />
                  <div className={styles.order__list__item__details}>
                    <p className={styles.order__list__item__details__title}>
										Ввведите данные получателя заказа
                    </p>
                    <OrderDetailsForm register={register} errors={errors}/>
                  </div>
                </li>
								<li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='5'
                    text='Программа лояльности'
                  />
                  <div className={s.BonusBlock}>
                    <p className={s.BonusText}>
                      <span className={s.BonusTitle}>Ваш уровень: </span>
                      <span className={s.BonusValue}>{bonusType}</span>
                    </p>
                  </div>
                  <div className={s.BonusBlock}>
                    <p className={s.BonusText}>
                      <span className={s.BonusTitle}>Ваши бонусы: </span>
                      <span className={s.BonusValue}>{bonusData.amount}</span>
                    </p>
                  </div>
                    <label className={s.BonusMinusLabel} htmlFor='minusBonusIn'>Списать бонусы:</label>
                    <Input id='minusBonusIn' registerName='bonusMinusAmount' register={register} errors={errors.name} type='number' placeholder='Списать бонусы' className={s.BonusMinus} min={0} max={bonusData.amount} />
                </li>
								<li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='6'
                    text='Промокод'
                  />
                  <PromotionalCode register={register} errors={errors} setPromocodeValue={setPromocodeData}/>
                </li>
              </ul>
            </div>
            <div className={styles.order__inner__right}>
              <div className={styles.order__inner__right__order}>
                <OrderInfoBlock cartData={cartData} isOrderPage={true} bonus={bonuses} bonusType={bonusType} bonusStatus={bonusData.status}
                promocode={promocodeValue} />
              </div>
            </div>
          </div>
        </Form>
      </Section>
		</main>
	)
}
export default CartPageTemplate