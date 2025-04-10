"use client"
import { logOut } from '@/shared/api/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import cls from './Profile.module.scss'
interface ProfileProps{
	isAuth: boolean,
	username: string
}
 const Profile = ({isAuth, username}: ProfileProps) => {
	const router = useRouter()

	const authLink = () => {
		isAuth? router.push('/signin') : null
	}
	
	return (
		<div className={cls.Container}>
		<Link 
				href={isAuth ? '#' : '/signin'}
				className={cls.Profile}>{username === '' ?
				 <span className={cls.Username}>Войти</span> :
				 <span className={cls.Username}>{username}</span>}
				 
		</Link>
		{isAuth && (
					<ul className={cls.List}>
						<li
								key={'useId()2'}
								className={cls.Item}
						>
								<button onClick={() => router.push('/profile/general')} className={cls.logOut}>Профиль</button>
						</li>

						<li
								key={'z123useId()'}
								className={cls.Item}
						>
								<button className={cls.logOut} onClick={logOut}>Выйти</button>
						</li>
														
					</ul>
					)}
		</div>
			
	)
}
export default Profile;