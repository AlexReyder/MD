import { CartItems } from '@/shared/types/cart'
import { Section, Slider } from '@/shared/ui'
import s from './styles.module.scss'
export const CarouselSection = ({data, title}: {data:CartItems, title: string}) => {
	return(
		<Section className={s.Carousel}>
			<h2 className={s.Title}>{title}</h2>
		<Slider data={data}/>
		</Section>
	)
}