import EditProfile from '@/features/EditProfile/EditProfile'
import { getProfileData, isProtected } from '@/shared/api/user'
import { UserProfileDTO } from '@/shared/types/user'
import { Section } from '@/shared/ui'
import s from '../styles.module.scss'

export default async function ProfileGeneral() {
  await isProtected()
  const generalProfileData: UserProfileDTO = await getProfileData();
  return (
    <Section className={s.Wrapper}>
      <EditProfile data={generalProfileData} className={s.EditProfileClass}/>
    </Section>
  )
}