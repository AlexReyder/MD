import { getAllFilters } from '@/shared/api/admin/filters'
import { columns } from '@/shared/shadcnui/filter-table/filter-columns'
import { FilterPageTemplate } from '@/shared/shadcnui/layouts/filter-page-template'
import { filterListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Группы"
};

export default async function AdminFilterBandsPage() {
	const bands = await getAllFilters('band')
	const data = filterListSchema.parse(bands.success)
	return (
				<FilterPageTemplate title='Список музыкальных групп' subtitle ='Управление музыкальными группами.' data={data} columns={columns} filterType='band' error={bands.error}/>
	);
}
