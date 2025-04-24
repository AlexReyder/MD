import slug from 'slug'
import s from './Product.module.scss'
export const ProductTable = ({className, category, manufacturer}: {className: string, category: string, manufacturer: string}) =>{
	const categorySlug = slug(category)
	const manufacturerSlug = slug(manufacturer)
	const showTable = categorySlug === 'futbolki' || categorySlug === 'lognslivy'
	return(
		<>
		{categorySlug !== 'flagi' && categorySlug !== 'nashivki' ? 
		(<div className={`${s.TableContainer} ${className}`}>
			<img src={`/img/table/${categorySlug}_${manufacturerSlug}.jpg`} alt='Размерная сетка Maldito' width={598} height={284} className={s.TableImage}/>
		</div>
		)
		: null
	}
		</>
	)
}