import PasswordProfile from '@/features/PasswordProfile/PasswordProfile'
import { isProtected } from '@/shared/api/user'
import { Section } from '@/shared/ui'
import s from '../styles.module.scss'
export default async function ProfilePassword() {
	await isProtected()
	return (
		<Section className={s.Wrapper}>
			<PasswordProfile className={s.PasswordProfileClass}/>
		</Section>
	)
}