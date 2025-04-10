"use client"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'
import s from './HeroSection.module.scss'
export const HeroSection = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [
		Autoplay({ playOnInit: true, delay: 3000 })
	])
	const data = ['/img/hero/1.jpg',
									'/img/hero/2.jpg',
									'/img/hero/3.jpg',
									'/img/hero/4.jpg',
								
	]
	return(
		<section className={s.Carousel}>
			<div className={s.embla}>
			<div className={s.viewport} ref={emblaRef}>
				<div className={s.embla__container}>
					{data.map((src:any) => (
						<div className={s.Slide} key={useId()}>
							<Image src={src} alt='Maldito' fill style={{objectFit:'cover'}}/>
							<Link href="/catalog" className={s.Link}></Link>
						</div>
					))}
				</div>
			</div>
			</div>
		</section>
	)
}