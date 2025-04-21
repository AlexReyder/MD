import { getHeroBanners, getProductsByIsBestseller, getProductsByIsNew } from '@/shared/api/catalog'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AdvantagesSection } from './AdvantagesSection'
import { CarouselSection } from './BestsellersSection'
import { HeroSection } from './HeroSection'
import CatalogSection from './Sections/CatalogSection/CatalogSection'

export function MainPageTemplate(){
		const banners = getHeroBanners()
		const bestsellers =  getProductsByIsBestseller()
		const news =  getProductsByIsNew()
	return(
		<>
			<Suspense fallback={<Skeleton count={7}/>}>
			<HeroSection data={banners}/>
			</Suspense>
			<CatalogSection/>
			<Suspense fallback={<Skeleton count={7}/>}>
				<CarouselSection title='Новинки' data={news}/>
			</Suspense>
		{bestsellers && (
				<Suspense fallback={<Skeleton count={7}/>}>
							<CarouselSection title='Хиты' data={bestsellers}/>
			</Suspense>
		)}
			
		<AdvantagesSection title='Нас выбирают'/>
		</>
	)
}