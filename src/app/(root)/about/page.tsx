import { Breadcrumbs } from '@/features'
import { HeadingWithCount, Section } from '@/shared/ui'
import { AboutPageTemplate } from '@/templates/AboutPageTemplate/AboutPageTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'О нас',
}

export default async function AboutPage() {
	return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount doCount={false} title='О нас'/>
			</Section>
			<AboutPageTemplate/>
		</main>
	)
}