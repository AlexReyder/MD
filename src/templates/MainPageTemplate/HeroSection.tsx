"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { use, useId } from 'react'
import s from './HeroSection.module.scss'
export const HeroSection = ({data}: {data:Promise<any>}) => {
	const useData = use(data)
	const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [
		Autoplay({ playOnInit: true, delay: 3000 })
	])

	return(
	<>
		{
			useData.success && (
				<section className={s.Carousel}>
				<div className={s.embla}>
				<div className={s.viewport} ref={emblaRef}>
					<div className={s.embla__container}>
						{useData.success.map((item:any) => (
							<div className={s.Slide} key={useId()}>
								<Image src={item.url} alt={item.alt} fill style={{objectFit:'cover'}}/>
								<Link href={item.link} className={s.Link}></Link>
							</div>
						))}
					</div>
				</div>
				</div>
			</section>
			)
		}
	</>
	)
}