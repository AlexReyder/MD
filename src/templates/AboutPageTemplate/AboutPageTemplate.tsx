import { Section } from '@/shared/ui'
import s from './AboutPageTemplate.module.scss'

export const AboutPageTemplate = async () => {

	const aboutData = await fetch(`${process.env.SITE_DOMAIN}/api/about`)
	const content = await aboutData.json()

	return(
		<Section className={s.Wrapper}>
		{
			content?.success?.html ? 
			<div className="ql-editor" dangerouslySetInnerHTML={{__html:content.success.html}}> 
			</div>
			: 
			null
		}
		</Section>
	)
}
