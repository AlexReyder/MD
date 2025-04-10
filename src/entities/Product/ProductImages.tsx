"use client"
import { getQueryParamValue } from '@/shared/utils/search-params'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import 'photoswipe/dist/photoswipe.css'
import React, { useCallback, useEffect, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'
import s from './ProductSlider.module.scss'


const ProductImages = ({images}: {images:any}) => {
  const [activeThumb, setActiveThumb] = useState()
	const searchParams = useSearchParams()
	const colorFromUrl = getQueryParamValue(searchParams, 'color') as string
  const color = colorFromUrl ? colorFromUrl : 'blue';
  // const slides = images[color].length;
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
      containScroll: 'keepSnaps',
      dragFree: true
    })


    const onThumbClick = useCallback(
        (index: number) => {
          if (!emblaMainApi || !emblaThumbsApi) return
          emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
      )
    
      const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
      }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])
    
      useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
    
        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
      }, [emblaMainApi, onSelect])
    


	return(

      <div className={s.embla}>
        <div className="embla__viewport" ref={emblaMainRef}>
          <Gallery>
          <div className={s.embla__container}>
            {images[color].map((src) => (
              <div className={s.Slide} key={src}>
                <div className={s.SlideWrapper}>
                <Item
                  original={'/' + src}
                  thumbnail={'/' + src}
                  width="4032"
                  height="3024"
                 >   
                  {({ ref, open }) => (
                      <Image src={'/' + src} alt={src} fill 
                      style={{objectFit:'scale-down'}}
                      onClick={open}
                      ref={ref}
                      />
                  )}
                   </Item>
                </div>
              </div>
            ))}
          </div>
          </Gallery>
        </div>
  
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className={s.ThumbWrapper}>
              {images[color].map((index, i) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(i)}
                  selected={i === selectedIndex}
                  index={i}
                  image={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
	)
}
export default ProductImages

type PropType = {
  selected: boolean
  index: number
  onClick: () => void
  image: any
}

const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props

  return (
    <div
      className={`${s.ThumbContainer}
        ${selected ? s.ThumbSelected : ''} `
      }
    >
      <button
        onClick={onClick}
        type="button"
        className={s.ThumbBtn}
      >
          <Image src={'/' + image} alt={image} fill  style={{objectFit:'cover'}}/>
      </button>
    </div>
  )
}