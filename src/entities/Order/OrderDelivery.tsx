import { DeliveryEnum } from '@/shared/types/schemas'
import { DeliveryPricesDb } from '@/shared/types/validation/delivery-prices'
import { FormRadio } from '@/shared/ui/Form/FormRadio'
import s from './OrderPayment.module.scss'


const OrderPayment = ({register, deliveryPricesData, disabled = false}: {register: any, deliveryPricesData: DeliveryPricesDb | undefined, disabled: boolean}) => {


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
								 <FormRadio register={register} registerName='delivery' text ={'CDEK'} value={DeliveryEnum.CDEK} id='delivery-1' defaultChecked icon='/img/delivery/cdek.svg' name='delivery-group' disabled={disabled} />
								 {deliveryPricesData ? (
									<div>
										 <p className={s.DeliveryPrice}>Доставка от: {deliveryPricesData.CDEK} ₽ </p>
										 <p className={s.DeliveryPrice}>{deliveryPricesData.CDEKdays}</p>
									</div>
								 ) : null}

							</div>
							<div  className={s.DeliveryInputBlock}>
							<FormRadio register={register} registerName='delivery' text ={'Почта России'} value={DeliveryEnum.MAILRUSSIA} id='delivery-2' icon='/img/delivery/mail.svg' name='delivery-group' disabled={disabled}/>
							{deliveryPricesData ? (
								<div>
									<p className={s.DeliveryPrice}>Доставка от: {deliveryPricesData.MAILRUSSIA} ₽ </p>
									<p className={s.DeliveryPrice}>{deliveryPricesData.MAILRUSSIAdays}</p>
								</div>
								 ) : null}
							</div>
							<div  className={s.DeliveryInputBlock}>
							<FormRadio register={register} registerName='delivery' text ={'Яндекс Доставка'} value={DeliveryEnum.YANDEX} id='delivery-3' icon='/img/delivery/yandex.svg' name='delivery-group' disabled={disabled}/>
							{deliveryPricesData ? (
								<div>
									<p className={s.DeliveryPrice}>Доставка от: {deliveryPricesData.YANDEX} ₽ </p>
									<p className={s.DeliveryPrice}>{deliveryPricesData.YANDEXdays}</p>
								</div>
								 ) : null}
							</div>

							<div  className={s.DeliveryInputBlock}>
							<FormRadio register={register} registerName='delivery' text ={'5 POST'} value={DeliveryEnum.FIVEPOST} id='delivery-4' icon='/img/delivery/5post.svg' name='delivery-group' disabled={disabled}/>
							{deliveryPricesData ? (
								<div>
									<p className={s.DeliveryPrice}>Доставка от: {deliveryPricesData.FIVEPOST} ₽ </p>
									<p className={s.DeliveryPrice}>{deliveryPricesData.FIVEPOSTdays}</p>
								</div>
								 ) : null}
							</div>

							<div  className={s.DeliveryInputBlock}>
							<FormRadio register={register} registerName='delivery' text ={'Курьерская доставка'} value={DeliveryEnum.COURIER} id='delivery-5' icon='/img/delivery/courier.svg' name='delivery-group' disabled={disabled}/>
							{deliveryPricesData ? (
								<div>
									<p className={s.DeliveryPrice}>Доставка от: {deliveryPricesData.COURIER} ₽ </p>
									<p className={s.DeliveryPrice}>{deliveryPricesData.COURIERdays}</p>
								</div>
								 ) : null}
							</div>
								
								
						</div>
					</div>
			</div>
		</div>
	)
}

export default OrderPayment