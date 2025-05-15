"use client"
import Link from 'next/link'
import { useState } from 'react'
import './MenuMobile.scss'

interface MenuProps {
	className?: string
}

export const MenuMobile = ({ className }: MenuProps) => {
	const [menu, toggleMenu] = useState(false)


	const onToggle = () => {
		// if (!menu) {
		// 	document.body.querySelector('#sidebar').classList.add('hideEl')
		// 	document.body.style.overflow = 'hidden'
		// } else {
		// 	document.body.querySelector('#sidebar').classList.remove('hideEl')
		// 	document.body.style.overflow = ''
		// }
		toggleMenu(!menu)
	}

	return (
		<div className={`navigation ${menu ? 'nav-active' : ''} f-c`}>
			<div className='nav-but-wrap' onClick={onToggle}>
				<div className='menu-icon hover-target'>
					<span className='menu-icon__line menu-icon__line-left'></span>
					<span className='menu-icon__line'></span>
					<span className='menu-icon__line menu-icon__line-right'></span>
				</div>
			</div>

			<nav className='nav'>
				<div className='nav__content'>
					<ul className='nav__list'>
						<li className='nav__list-item'>
							<Link href='/'  onClick={onToggle}>
								Главная
							</Link>
						</li>
							<li className='nav__list-item'>
							<Link href='/catalog'  onClick={onToggle}>
								Каталог
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/catalog/futbolki'
								 onClick={onToggle}
								style={{ color: '#fff' }}
							>
								Футболки
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/catalog/longslivy'
								 onClick={onToggle}
								style={{ color: '#fff' }}
								className='nav__list-link'
							>
								Лонгсливы
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/catalog/flagi'
								 onClick={onToggle}
								style={{ color: '#fff' }}
							>
								Флаги
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/catalog/nashivki'
								 onClick={onToggle}
								style={{ color: '#fff' }}
							>
								Нашивки
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/about'
								 onClick={onToggle}
								style={{ color: '#fff' }}
							>
								О нас
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/contacts'
								 onClick={onToggle}
								style={{ color: '#fff' }}
							>
								Контакты
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/delivery'
								style={{ color: '#fff' }}
								onClick={onToggle}
							>
								Доставка / Оплата
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/return'
								style={{ color: '#fff' }}
								onClick={onToggle}
							>
								Обмен / Возврат
							</Link>
						</li>
						<li className='nav__list-item'>
							<Link
								href='/faq'
								style={{ color: '#fff' }}
								onClick={onToggle}
							>
								FAQ
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}
