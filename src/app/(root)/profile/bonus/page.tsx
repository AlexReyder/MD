import { getBonus } from '@/shared/api/bonus'
import { isProtected } from '@/shared/api/user'
import { bonusStatusAdminForm } from '@/shared/types/user'
import { FormHeader, Section } from '@/shared/ui'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import s from '../styles.module.scss'
export default async function ProfileBonusPage() {
	await isProtected()
	const {success, error} = await getBonus()
	const bonusLevel = bonusStatusAdminForm.filter((item) => item.value === success?.status)[0].label
	// const {success, error} = await getOrderHistory()
	// if(error && error !== 'EMPTY_ORDERS'){
	// 	notFound()
	// }
	return (
		<Section className={s.Wrapper}>
				<FormHeader title='Программа лояльности' description=''/>
				<div className={s.BonusInfo}>
					<p className={s.BonusTextBlock}>
						<span>Ваш уровень:</span>
						<span className={s.BonusTextValue}> {bonusLevel}</span>
					</p>
					<p className={s.BonusTextBlock}>
						<span>Бонусы:</span>
						<span className={s.BonusTextValue}> {success?.amount}</span>
					</p>
				</div>
				<div>
					<h3 className={s.Subtitle}>История бонусов</h3>
					<ul className={s.BonusList}>
						{
							success?.history.map((item: any) => {
								return(
									<li className={s.BonusItem} key={item.date}>
											<div className={s.BonusListField}>
												<p className={s.BonusFieldTitle}>{item.type === 'minus' ? 'Списано' : 'Начислено'}</p>
												<p className={s.BonusFieldValue}>{item.amount} бонусов</p>
											</div>
											<div className={s.BonusListField}>
											<p className={s.BonusFieldTitle}>Цель</p>
												<p className={s.BonusFieldValue}>{item.title}</p>
											</div>
											<div className={s.BonusListField}>
												<p className={s.BonusFieldTitle}>Дата</p>
												<p className={s.BonusFieldValue}>{format(item.date,"d.MM.yyyy h:mm ", {locale: ru})}</p>
											</div>
								</li>
								)
							})
						}
					
					</ul>
				</div>
			{/* {
				error && error  === 'EMPTY_ORDERS' ? (<h3>У вас пока нет заказов.</h3>) : null
			}
			 {success && success.map((item, i: number) => {
				const productJson = item.products
				const product = productJson */}
		</Section>
	)
}