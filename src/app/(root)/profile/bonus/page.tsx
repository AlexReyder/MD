import { getBonus } from '@/shared/api/bonus'
import { isProtected } from '@/shared/api/user'
import { bonusStatusAdminForm } from '@/shared/types/user'
import { BonusesTypeEnum } from '@/shared/types/validation/bonus'
import { FormHeader, Section } from '@/shared/ui'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import s from '../styles.module.scss'
export default async function ProfileBonusPage() {
	await isProtected()
	const {success, error} = await getBonus()
	const bonusLevel = bonusStatusAdminForm.filter((item) => item.value === success?.data.status)[0].label

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
						<span className={s.BonusTextValue}> {success?.currentAmount}</span>
					</p>
				</div>
				<div>
					<h3 className={s.Subtitle}>История бонусов</h3>
					<ul className={s.BonusList}>
						{
							success?.data.history.map((item) => {
								return(
									<li className={s.BonusItem} key={item.createdAt.toString() + item.amount}>
											<div className={s.BonusListField}>
												<p className={s.BonusFieldTitle}>{item.type === BonusesTypeEnum.MINUS ? 'Списано' : 'Начислено'}</p>
												<p className={s.BonusFieldValue}>{item.amount} бонусов</p>
											</div>
											<div className={s.BonusListField}>
											<p className={s.BonusFieldTitle}>Цель</p>
												<p className={s.BonusFieldValue}>{item.title}</p>
											</div>
											<div className={s.BonusListField}>
												<p className={s.BonusFieldTitle}>Действует до</p>
												<p className={s.BonusFieldValue}>{item.expiresAt ? format(item.expiresAt,"d.MM.yyyy hh:mm ", {locale: ru}) : 'Неограничено'}</p>
											</div>
											<div className={s.BonusListField}>
												<p className={s.BonusFieldTitle}>Дата</p>
												<p className={s.BonusFieldValue}>{format(item.createdAt,"d.MM.yyyy hh:mm ", {locale: ru})}</p>
											</div>
								</li>
								)
							})
						}
					
					</ul>
				</div>
		</Section>
	)
}