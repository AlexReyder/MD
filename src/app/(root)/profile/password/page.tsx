import PasswordProfile from '@/features/PasswordProfile/PasswordProfile'
import { Section } from '@/shared/ui'
import s from '../styles.module.scss'
export default function ProfilePassword() {
	
	return (
		<Section className={s.Wrapper}>
			<PasswordProfile className={s.PasswordProfileClass}/>
		</Section>
	)
}