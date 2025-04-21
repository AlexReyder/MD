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
						{item.answer}
					</Accordion>
					)
				})
			}
			</div>
		</Section>
	)
}
