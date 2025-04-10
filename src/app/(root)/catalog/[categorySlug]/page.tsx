import { CatalogFilters } from '@/entities/CatalogFilters/CatalogFilters'
import { CatalogPagination } from '@/entities/CatalogPagination/CatalogPagination'
import { Breadcrumbs } from '@/features'
import { getProductsByCategory } from '@/shared/api/catalog'
import { getFiltersData } from '@/shared/api/filters'
import { HeadingWithCount, Section } from '@/shared/ui'
import { Products } from '@/widgets/Products/Products'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import s from '../page.module.scss'

// type Props = {
//   params: Promise<{ categorySlug: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const { categorySlug } = await params
 
//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []
 
//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }

export const metadata: Metadata = {
	title: 'Каталог',
}

export default async  function CatalogCategoryPage({
	params,
	searchParams,
}: {
	params: Promise<{ categorySlug: string }>,
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const  {categorySlug}  = await params
	const offset = (await searchParams).offset as string | undefined;
	const selected = offset ? Number.parseInt(offset) : redirect('?offset=1'); 
	const products = await getProductsByCategory(categorySlug, selected);
	const {success, error} = await getFiltersData();

	return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount count={products.success.length} title={products.success.categoryName?.name}/>
			</Section>
			<Section className={s.Container}>
			<CatalogFilters data={success} error={error}/>
			<Products products={products.success.products}/>
			</Section>
			<CatalogPagination productsCount={products.success.length} queryPage={selected} />
			<footer></footer>
		</main>
	);
}