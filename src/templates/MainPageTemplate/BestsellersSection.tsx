import { ProductAdmin } from '@/shared/types/schemas'
import { Section, Slider } from '@/shared/ui'
import { use } from 'react'
import s from './styles.module.scss'
export const CarouselSection = ({data, title}: {data:Promise<{success: ProductAdmin[] | null, error: string | null}>, title: string}) => {
	const useData = use(data)
	return(
		<>
		{
			useData.success?.length > 0 ?
			<Section className={s.Carousel}>
			<h2 className={s.Title}>{title}</h2>
		<Slider data={useData.success}/>
		</Section>
		: 
		<></>
		}
		</>
	
	)
}