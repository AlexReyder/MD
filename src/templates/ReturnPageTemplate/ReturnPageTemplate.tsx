import { Section } from '@/shared/ui'
import s from './ReturnPageTemplate.module.scss'

export const ReturnPageTemplate = async () => {

	const returnData = await fetch(`${process.env.SITE_DOMAIN}/api/exchange-return`)
	const content = await returnData.json()
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
