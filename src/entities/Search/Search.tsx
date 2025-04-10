"use client"
import s from './Search.module.scss'

export const Search = () => {

	const handleSearch = () => {

	}
	return(
		<div className={s.Container}> 
			<input type='search' className={s.Search} placeholder='Поиск товаров' />
			<button
			className={s.Button}
			onClick={handleSearch}
			/>
		</div>
	)
}