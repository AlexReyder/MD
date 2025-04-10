"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { translate } from '../Product/ProductColorsItem'
import s from './CatalogFilters.module.scss'

const FilterEntity = ({data, name, isObj = false}: {data:[], name: string, isObj?: boolean}) => {
	const state = !isObj ? data.reduce((a, v) => ({ ...a, [v]: false}), {}) : data.reduce((a, v) => ({ ...a, [v.name]: false}), {}); 

	const [inputs, setInputs] = useState(state)

	useEffect(()=>{
		handleGenerateQueryPath()
	},[inputs])



	const router = useRouter()
  const searchParams = useSearchParams()
	const pathname = usePathname()

	function handleChange (e, rendered:any){
		setInputs((prevState) => ({
					...prevState,
					[rendered]: e.target.checked,
				}))
	}
		
	const createQueryString = (name: string, value: string) => {
				const params = new URLSearchParams(searchParams?.toString())
				params.set(name, value)
				params.set('offset', '1')
				if(value === '') {
					params.delete(name)
				} 

				return params.toString()
			}
  const handleGenerateQueryPath = () => {
			const keys = currentAppliedFilters()
			const path = createQueryString(name, keys);
			router.push(pathname + '?' + path)
	}


	function currentAppliedFilters(){
		let keys = ''
		for (const [key, value] of Object.entries(inputs)) {
			if(value){
					keys+=key + ',';
			}
		}
		return keys
	}
	
			// const set = (prop) => {
			// 	setInputs((prevState) => ({
			// 		...prevState,
			// 		prop: false,
			// 	}))
			// }

	return(
	<div>
			{data && (
			data.map((item:any) => {
				const rendered: any = isObj ? item.name : item;
				// console.log(inputs[`${rendered}`])
				return (
					<div key={rendered} className={s.FilterContainer}>
						<input type="checkbox" name={rendered} id={rendered} className={s.FilterInput} onChange={(e) => handleChange(e, rendered)} checked={inputs[`${rendered}`]}/>
						<label htmlFor={rendered} className={s.FilterText}>{name === 'colors' ? translate(rendered) : rendered}</label>
					</div>
				)
			})
		)}
	</div>
	)
}

export default FilterEntity

