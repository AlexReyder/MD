import { Breadcrumbs } from '@/features'
import { getFAQContent } from '@/shared/api/faq'
import { HeadingWithCount, Section } from '@/shared/ui'
import { FAQPageTemplate } from '@/templates'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Ответы на вопросы',
}

export default async function FAQPage() {
	const {success, error} = await getFAQContent()
		if(error){
			notFound()
		}
	return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount doCount={false} title='Ответы на вопросы'/>
			</Section>
	
				<FAQPageTemplate data={success}/>
		</main>
	)
}