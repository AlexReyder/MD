"use client"
import { getSearchParamsUrl, updateSearchParam } from '@/shared/utils/common'
import styles from '@/styles/catalog/index.module.scss'
import { redirect, usePathname } from 'next/navigation'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'

interface Props {
	productsCount: number
	queryPage: number
}

export const CatalogPagination = ({productsCount, queryPage}: Props) => {
		const [currentPage, setCurrentPage] = useState<number>(queryPage)
		const pagesCount = Math.ceil((productsCount || 12) / 12)
		const paginationProps = {
				// disableInitialCallback:true,
				// initialPage:1,
				containerClassName: `${styles.catalog__bottom__list}`,
				pageClassName: `catalog-pagination-item ${styles.catalog__bottom__list__item}`,
				pageLinkClassName: styles.catalog__bottom__list__item__link,
				previousClassName: `catalog-pagination-prev ${styles.catalog__bottom__list__prev}`,
				nextClassName: `catalog-pagination-next ${styles.catalog__bottom__list__next}`,
				breakClassName: styles.catalog__bottom__list__break,
				breakLinkClassName: styles.catalog__bottom__list__break__link,
				breakLabe: '...',
				pageCount: pagesCount,
				forcePage: currentPage - 1,
		}
		const pathname = usePathname()

		const handlePageChange = ({ selected }: { selected: number }) => {
			 const urlParams = getSearchParamsUrl()
			 urlParams.delete('offset')
			 const path =  updateSearchParam('offset', selected + 1, pathname)
			 setCurrentPage(selected + 1)
			 redirect(path)

			}
		

	return(
		<div className={styles.catalog__bottom}>
		<ReactPaginate
			{...paginationProps}
			nextLabel={<span>Дальше</span>}
			previousLabel={
				<span>Назад</span>
			}
			onPageChange={handlePageChange}
		/>
	</div>
	)
}