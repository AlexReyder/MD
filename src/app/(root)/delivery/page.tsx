import { Breadcrumbs } from '@/features'
import { HeadingWithCount, Section } from '@/shared/ui'
import { DeliveryPageTemplate } from '@/templates'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Доставка / Оплата',
}

export default function DeliveryPage() {
	return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount doCount={false} title='Доставка и оплата товаров'/>
			</Section>
			<DeliveryPageTemplate/>
		</main>
	)
}