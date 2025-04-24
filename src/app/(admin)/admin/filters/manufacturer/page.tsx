import { getAllFilters } from '@/shared/api/admin/filters'
import { columns } from '@/shared/shadcnui/filter-table/filter-columns'
import { FilterPageTemplate } from '@/shared/shadcnui/layouts/filter-page-template'
import { filterListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Производители"
};

export default async function AdminFilterManufacturePage() {
	const manufacture = await getAllFilters('manufacturer')
	const data = filterListSchema.parse(manufacture.success)
	return (
			<FilterPageTemplate title='Список производителей' subtitle ='Управление производителями.' data={data} columns={columns} filterType='manufacturer' error={manufacture.error}/>
	);
}
