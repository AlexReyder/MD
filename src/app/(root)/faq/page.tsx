import { Breadcrumbs } from '@/features'
import { HeadingWithCount, Section } from '@/shared/ui'
import { FAQPageTemplate } from '@/templates'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Ответы на вопросы',
}

export default function FAQPage() {
	return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount doCount={false} title='Ответы на вопросы'/>
			</Section>
			<FAQPageTemplate/>
		</main>
	)
}