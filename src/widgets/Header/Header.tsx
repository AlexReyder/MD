import CartCount from '@/entities/CartCount/CartCount'
import Profile from '@/entities/Profile/Profile'
import { Search } from '@/entities/Search/Search'
import { getProductsCartLength } from '@/shared/api/cart'
import { verifySession } from '@/shared/api/session'
import { Logo } from '@/shared/ui'
import { Suspense } from 'react'
import { Menu } from '../Menu/Menu'
import s from './Header.module.scss'

export async function Header() {
  const {isAuth, userName} = await verifySession()
  const {success, error} = await getProductsCartLength()
	return(
		  <header className={s.Header}>
          <Logo />
          <ul className={s.HeaderLinks}>
            <li className={s.HeaderItem}>
              <Search/>
            </li>
            <li className={s.HeaderItem}>
              <Suspense fallback={<p>Loading</p>}>
                <CartCount cartLength={success}/>
              </Suspense>
            </li>
            <li className={s.HeaderItem}>
                <Suspense fallback={<p>Loading</p>}>
                  <Profile isAuth={isAuth} username = {userName as string}/>
                </Suspense>
            </li>
          </ul>
          <Menu/>
        {/* </Section> */}
    </header>

	)
}
