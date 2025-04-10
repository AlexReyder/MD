import { Section } from '@/shared/ui'
import { SaluteIcon } from '@/shared/ui/Icons/SaluteIcon/SaluteIcon'
import { ErrorPageTemplate } from '@/templates'
import { Metadata } from 'next'
import s from './style.module.scss'
export const metadata: Metadata = {
	title: "Заказ сформирован"
};

export default async function OrderPage() {
	

	return (
		<main>
			<Section>
				<ErrorPageTemplate title='Заказ сформирован' description='Письмо с заказом отправлены на вашу электронную почту. Менеджер свяжется с вами для уточнения деталей.' icon={<SaluteIcon fill='var(--g-color-1)' className={s.Icon}/>}/>
			</Section>
		</main>
	)
}