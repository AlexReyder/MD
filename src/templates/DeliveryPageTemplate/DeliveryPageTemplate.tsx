import { Section } from '@/shared/ui'
import s from './DeliveryPageTemplate.module.scss'

export const DeliveryPageTemplate = async () => {
	const deliveryData = await fetch(`${process.env.SITE_DOMAIN}/api/delivery-payment`)
	const content = await deliveryData.json()
	return(
		<Section className={s.Wrapper}>
		{
				content && content.success ? (
					<div className="ql-editor" dangerouslySetInnerHTML={{__html:content.success?.html}}>
					</div>
				) 
				: 
				<span></span>
			}
		</Section>
	)
}
