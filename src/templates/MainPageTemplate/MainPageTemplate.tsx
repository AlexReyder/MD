import { AdvantagesSection } from './AdvantagesSection'
import { CarouselSection } from './BestsellersSection'
import { HeroSection } from './HeroSection'
import CatalogSection from './Sections/CatalogSection/CatalogSection'

export async function MainPageTemplate(){
		const bannersData = await fetch(`${process.env.SITE_DOMAIN}/api/hero/getBanners`)
		const banners = await bannersData.json()

		const bestsellersData = await fetch(`${process.env.SITE_DOMAIN}/api/hero/getBestsellers`)
		const bestsellers = await bestsellersData.json()

		const newsData = await fetch(`${process.env.SITE_DOMAIN}/api/hero/getNew`)
		const news = await newsData.json()
	return(
		<>
			<HeroSection data={banners}/>
			<CatalogSection/>
			<CarouselSection title='Новинки' data={news}/>
			<CarouselSection title='Хиты' data={bestsellers}/>
			<AdvantagesSection title='Нас выбирают'/>
		</>
	)
}