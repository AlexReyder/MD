import { DeliveryEnum } from '@/shared/types/schemas'
import { FormRadio } from '@/shared/ui/Form/FormRadio'
import s from './OrderPayment.module.scss'


const OrderPayment = ({register}: {register:any}) => {


	return (
		<div className={s.Payment}>

			<div className={s.Payment__inner}>
					<div
						className={s.Payment__content}
					>
							<p
							className={s.Payment__content__advice}>
								Выберите способ получения товара
							</p>
						<div>
							<div className={s.DeliveryInputBlock}>
								 <FormRadio register={register} registerName='delivery' text ={'CDEK'} value={DeliveryEnum.CDEK} id='delivery-1' defaultChecked icon='/img/delivery/cdek.svg' name='delivery-group'/>
								 <p className={s.DeliveryPrice}>Доставка от: 200 ₽</p>
							</div>
							<div  className={s.DeliveryInputBlock}>
							<FormRadio register={register} registerName='delivery' text ={'Почта России'} value={DeliveryEnum.MAILRUSSIA} id='delivery-2' icon='/img/delivery/mail.svg' name='delivery-group'/>
							<p className={s.DeliveryPrice}>Доставка от: 200 ₽</p>
							</div>
							<div  className={s.DeliveryInputBlock}>
							<FormRadio register={register} registerName='delivery' text ={'Яндекс Доставка'} value={DeliveryEnum.YANDEX} id='delivery-3' icon='/img/delivery/yandex.svg' name='delivery-group'/>
							<p className={s.DeliveryPrice}>Доставка от: 200 ₽</p>
							</div>

							<div  className={s.DeliveryInputBlock}>
							<FormRadio register={register} registerName='delivery' text ={'5 POST'} value={DeliveryEnum.FIVEPOST} id='delivery-4' icon='/img/delivery/5post.svg' name='delivery-group'/>
							<p className={s.DeliveryPrice}>Доставка от: 200 ₽</p>
							</div>
								
								
						</div>
					</div>
			</div>
		</div>
	)
}

export default OrderPayment