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
import { DeliveryEnum, makeOrderSchema, PaymentEnum, } from '@/shared/types/schemas'
import { UserProfileDTO } from '@/shared/types/user'
import { Form, Section } from '@/shared/ui'
import styles from '@/styles/order/index.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import s from './Order.module.scss'

interface Props{
	cartData: CartItems
	profileData: UserProfileDTO 
}
type FormSchema = z.infer<typeof makeOrderSchema>

const CartPageTemplate = ({cartData, profileData}: Props) => {
  const router = useRouter()
   const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
        defaultValues: {
          payment: PaymentEnum.TRANSFER,
          delivery:DeliveryEnum.CDEK,
          name: profileData.name ?? "",
          surname: profileData.surname ?? "",
          phone: profileData.phone ?? "",
          email: profileData.email ?? "",
          comment: "",
          promocode: ""
        },
        resolver: zodResolver(makeOrderSchema)
      })

    async function onSubmit(data: FormSchema) {
            const {success, error} = await makeOrder(data, cartData)
            if(success){
              router.push(`/order-confirm?order=${success}`)
            }
            if(error){
              console.log(error)
            }
          }

	return(
		<main>
		<Section className={s.Order}>
        <Form className='container' action={handleSubmit(onSubmit)}>
          {/* <h1 className={s.Title}>
					Оформление заказа
          </h1> */}
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
                    text='Промокод'
                  />
                  <PromotionalCode register={register} errors={errors} />
                </li>
              </ul>
            </div>
            <div className={styles.order__inner__right}>
              <div className={styles.order__inner__right__order}>
                <OrderInfoBlock cartData={cartData} isOrderPage={true} />
              </div>
            </div>
          </div>
        </Form>
      </Section>
		</main>
	)
}
export default CartPageTemplate