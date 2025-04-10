import { CatalogFilters } from '@/entities/CatalogFilters/CatalogFilters'
import { CatalogPagination } from '@/entities/CatalogPagination/CatalogPagination'
import { Breadcrumbs } from '@/features'
import { getAllProducts } from '@/shared/api/catalog'
import { getFiltersData } from '@/shared/api/filters'
import { HeadingWithCount, Section } from '@/shared/ui'
import { ErrorPageTemplate } from '@/templates'
import { Products } from '@/widgets/Products/Products'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import s from './page.module.scss'

export const metadata: Metadata = {
	title: 'Каталог',
}

export default async  function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const offset = (await searchParams).offset as string | undefined;
	const selected = offset ? Number.parseInt(offset) : redirect('?offset=1'); 
	const products = await getAllProducts(selected);
	const {success, error} = await getFiltersData();
	return (
		<main>
			{
				products && products.success? 
			<>
			<Section>
				<Breadcrumbs/>
				<HeadingWithCount count={products.success.length} title='Каталог'/>
  {/* </SkeletonTheme> */}
			</Section>
			<Section className={s.Container}>
					<CatalogFilters data={success} error={error}/>
					<Suspense fallback={<Skeleton count={7}/>}>
						<Products products={products.success.products}/>
					</Suspense>
			</Section>
			<CatalogPagination productsCount={products.success.length} queryPage={selected} />
			</>
				:
				<ErrorPageTemplate/>
			}
		</main>
	);
}


