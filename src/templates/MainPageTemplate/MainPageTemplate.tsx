import { CartItems } from '@/shared/types/cart'
import { AdvantagesSection } from './AdvantagesSection'
import { CarouselSection } from './BestsellersSection'
import { HeroSection } from './HeroSection'

interface Props{
	bestsellers: CartItems | null | any
	news: CartItems | null | any
}
export const MainPageTemplate = ({bestsellers, news}: Props) => {
	return(
		<>
		<HeroSection/>
		{news ? (<CarouselSection title='Новинки' data={news}/>) : <></>}
		{bestsellers ? (<CarouselSection title='Хиты' data={bestsellers}/>) : <></>}
		<AdvantagesSection title='Нас выбирают'/>
		</>
	)
}