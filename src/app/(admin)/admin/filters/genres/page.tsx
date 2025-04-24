import { getAllFilters } from '@/shared/api/admin/filters'
import { columns } from '@/shared/shadcnui/filter-table/filter-columns'
import { FilterPageTemplate } from '@/shared/shadcnui/layouts/filter-page-template'
import { filterListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Жанры"
};

export default async function AdminFilterBandsPage() {
	const genre = await getAllFilters('genre')
	const data = filterListSchema.parse(genre.success)
	return (
			<FilterPageTemplate title='Список музыкальных жанров' subtitle ='Управление музыкальными жанрами.' data={data} columns={columns} filterType='genre' error={genre.error}/>
	);
}
