import { Breadcrumbs } from '@/features'
import { HeadingWithCount, Section } from '@/shared/ui'
import { ReturnPageTemplate } from '@/templates'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Обмен / Возврат',
}

export default function ReturnPage() {
	return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount doCount={false} title='Обмен и возврат товаров'/>
			</Section>
			<ReturnPageTemplate/>
		</main>
	)
}