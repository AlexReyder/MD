import { Breadcrumbs } from '@/features'
import { HeadingWithCount, Section } from '@/shared/ui'
import { ProfileAside } from '@/templates'
import s from './styles.module.scss'
export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<Section>
			 <Breadcrumbs/>
          <HeadingWithCount
							doCount={false}
							title='Профиль'
					/>
			</Section>
		<Section className={s.Container}>
			<aside>
				<ProfileAside/>
			</aside>
			{children}
		</Section>
		</main>

	);
}