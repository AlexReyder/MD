import s from './CatalogFilters.module.scss'
import { FilterAccordion } from './FilterAccordion'
import FilterEntity from './FilterEntity'


interface Props{
	data: any
	error: any
}

export const CatalogFilters =  ({data, error}: Props) => {

	function applyFilters(){
		
	}

	return(
	<>
	{
		!error ? (
			<aside className={s.Filters}>
			<input type="checkbox" name="catalog-filters" id='open-filters' className={s.OpenCatalogFilters} defaultChecked/>
			<label htmlFor='open-filters' className={s.OpenBtn}>Фильтры</label>
			<div className={s.Box}>
			<FilterAccordion title='Группы' id='panel-1'>
			<FilterEntity data={data.bands} name='bands' isObj={true}/>
			</FilterAccordion>
			<FilterAccordion title='Цвета'  id='panel-2'>
						<FilterEntity data={data.colors} name='colors'/>
			</FilterAccordion>
			<FilterAccordion title='Размеры' id='panel-3'>
			<FilterEntity data={data.sizes} name='sizes'/>
			</FilterAccordion>
			</div>
		</aside>
		) :
		null
	}
	</>
	
	)
}