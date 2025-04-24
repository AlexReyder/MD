"use client"
import styles from '@/styles/catalog/index.module.scss'
import { parseAsInteger, useQueryState } from 'nuqs'
import ReactPaginate from 'react-paginate'
import s from './CatalogPagination.module.scss'
interface Props {
	productsCount: number
}

export const CatalogPagination = ({productsCount}: Props) => {
		const [offset, setOffset] = useQueryState('offset', parseAsInteger.withDefault(1).withOptions({shallow: false}))
		const pagesCount = Math.ceil((productsCount || 12) / 12)
		const paginationProps = {
				containerClassName: `${s.ContainerClassName}`,
				pageClassName: `${s.PageClassName}`,
				pageLinkClassName: s.PageLinkClassName,
				previousClassName: `catalog-pagination-prev ${styles.catalog__bottom__list__prev}`,
				nextClassName: `catalog-pagination-next ${styles.catalog__bottom__list__next}`,
				breakClassName: styles.catalog__bottom__list__break,
				breakLinkClassName: styles.catalog__bottom__list__break__link,
				breakLabe: '...',
				pageCount: pagesCount,
				forcePage: offset - 1,
		}

		const handlePageChange = ({ selected }: { selected: number }) => {
			 setOffset(selected + 1)
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