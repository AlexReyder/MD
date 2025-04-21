import { getAllSpecifications } from '@/shared/api/admin/specifications'
import { SpecPageTemplate } from '@/shared/shadcnui/layouts/spec-page-template'
import { columns } from '@/shared/shadcnui/specification-table/specification-columns'
import { specificationListSchema } from '@/shared/types/schemas'

export default async function AdminSpecCountryPage() {
	const country = await getAllSpecifications('country')
	const data = specificationListSchema.parse(country.success)
	
	return (
	<SpecPageTemplate 
		title='Список стран производства' 
		subtitle='Управление странами производства.' 
		data={data} 
		columns={columns} 
		specType='country' 
		error={country.error}/>
	);
}
