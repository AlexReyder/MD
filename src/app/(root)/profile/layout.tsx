import { Breadcrumbs } from '@/features'
import { HeadingWithCount, Section } from '@/shared/ui'
import { ProfileAside } from '@/templates'
import s from './styles.module.scss'
import { getUserRole } from '@/shared/api/user'

export default async function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const getRole = await getUserRole();
	console.log(getRole)
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
			<aside className={s.ProfileAside}>
				<ProfileAside isAdmin={getRole}/>
			</aside>
			{children}
		</Section>
		</main>

	);
}
