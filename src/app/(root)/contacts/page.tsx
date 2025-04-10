import { Breadcrumbs } from '@/features'
import { HeadingWithCount, Section } from '@/shared/ui'
import { ContactsPageTemplate } from '@/templates'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Контакты',
}

export default function ContactsPage() {
	return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount doCount={false} title='Контактная информация'/>
			</Section>
			<ContactsPageTemplate/>
		</main>
	)
}