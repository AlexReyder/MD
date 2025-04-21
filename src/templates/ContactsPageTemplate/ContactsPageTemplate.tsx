import { Section } from '@/shared/ui'
import { TelegramIcon } from '@/shared/ui/Icons/TelegramIcon/TelegramIcon'
import { VkIcon } from '@/shared/ui/Icons/VkIcon/VkIcon'
import { WhatsAppIcon } from '@/shared/ui/Icons/WhatsAppIcon/WhatsAppIcon'
import { MessangerLink } from '@/shared/ui/Link/MessangerLink/MessangerLink'
import s from './ContactsPageTemplate.module.scss'

export const ContactsPageTemplate = () => {
	return(
		<Section className={s.Wrapper}>
				<div className={s.Contact}>
					<div className={`${s.Contacts__entity} ${s.Entity_1}`}>
						<p className={s.Title}>Электронная почта</p>
						<a
							href='mailto:info@maldito.ru'
							className={`${s.Email} link`}
						>
							info@maldito.ru
						</a>
					</div>
					<div className={`${s.Contacts__entity} ${s.Entity_2}`}>
						<p className={s.Title}>Номер телефона</p>
						<a href='tel:+79500178989' className={`${s.Email} link`}>
						+7 (950) 017 89 89
						</a>
					</div>
					<div className={`${s.Contacts__entity} ${s.Entity_3}`}>
						<p className={s.Title}>Мессенджеры</p>
						<div className={s.Messangers}>
						<MessangerLink
												to='https://wa.me/79500178989'
												className='f-c'
												icon={<WhatsAppIcon className='nav__list-icon' />}
											/>
												<MessangerLink
													to='https://t.me/+79500178989'
													className='f-c'
													icon={<TelegramIcon className='nav__list-icon' />}
												/>
											<MessangerLink
												to='https://vk.com/maldito666'
												className='f-c'
												icon={<VkIcon className='nav__list-icon' />}
											/>
						</div>
					</div>
					<div className={`${s.Contacts__entity} ${s.Entity_1}`}>
						<p className={s.Title}>Канал в телеграм</p>
						<a
							href='https://t.me/maldito_merch_store'
							className={`${s.Email} link`}
						>
							Перейти &#8594;
						</a>
					</div>
				</div>
				<div className={s.Office}>
					<div className={`${s.Contacts__entity} ${s.Entity_4}`}>
						<p className={s.Title}>Адрес склада:</p>
						<p className={`${s.Address}`}>г. Санкт-Петербург, Невский пр. 172/1.</p>
					</div>
				</div>
				<div className={s.Requisites}>
					<div className={`${s.Contacts__entity} ${s.Entity_5}`}>
						<p className={s.Title}>Реквизиты</p>
						<p className={s.Business}>ИП Храпкова В.В.</p>
						<p className={s.Business}>ИНН 780533756760</p>
						<p className={s.Business}>ОГРНИП 324784700244011</p>
						<p className={s.Business}>Банк АО «ТБанк»</p>
						<p className={s.Business}>БИК 44525974</p>
						<p className={s.Business}>к/с 30101810145250000974</p>
						<p className={s.Business}>р/с 40802810600006495863</p>
					</div>
				</div>
		</Section>
	)
}
