import { Accordion, Section } from '@/shared/ui'
import s from './FAQPageTemplate.module.scss'

export const FAQPageTemplate = ({data}:{data:any}) => {
	return(
		<Section className={s.Wrapper}>
			<div className={s.Contact}>
			{
				data.map((item:any) => {
					return(
					<Accordion title={item.question} id={item.id} key={item.id}>
						Заказы, оформленные в рабочие дни до 13-00 передаются в этот же день в курьерскую службу СДЭК.
						Цена будет указана в карточке товара и в корзине, при оформлении заказа.
						Если в заказе 10 и более товаров стоимость доставки СДЭК незначительно изменится - стоимость будет видна в корзине!
					</Accordion>
					)
				})
			}
			</div>
		</Section>
	)
}
