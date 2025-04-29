import { Section, Slider } from '@/shared/ui'
import s from './styles.module.scss'
export const CarouselSection = ({data, title}: {data: any, title: string}) => {

	return(
		<>
		{
			data && data?.success?.length > 0 ?
			<Section className={s.Carousel}>
			<h2 className={s.Title}>{title}</h2>
			<Slider data={data.success}/>
			</Section>
		: 
		null
		}
		</>
	
	)
}