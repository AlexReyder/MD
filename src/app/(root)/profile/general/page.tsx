import EditProfile from '@/features/EditProfile/EditProfile'
import { getProfileData, isProtected } from '@/shared/api/user'
import { UserProfileDTO } from '@/shared/types/user'
import { Section } from '@/shared/ui'
import {logOut} from '@/shared/api/auth'
import s from '../styles.module.scss'

export default async function ProfileGeneral() {
  await isProtected()
  const generalProfileData: UserProfileDTO = await getProfileData();
  return (
    <div className={s.Wrapper}>
      <EditProfile data={generalProfileData} className={s.EditProfileClass} btnClass={s.Submit}/>
      <button onClick={logOut} className={s.LogoutButton}>выйти из аккаунта</button>
    </div>
  )
}
