import { getAllSpecifications } from '@/shared/api/admin/specifications'
import { SpecPageTemplate } from '@/shared/shadcnui/layouts/spec-page-template'
import { columns } from '@/shared/shadcnui/specification-table/specification-columns'
import { specificationListSchema } from '@/shared/types/schemas'

export default async function AdminSpecMaterialsPage() {

	const materials = await getAllSpecifications('material')
	const data = specificationListSchema.parse(materials.success)
	return (
		<SpecPageTemplate 
				title='Список материалов' 
				subtitle='Управление материалами.' 
				data={data} 
				columns={columns} 
				specType='material' 
				error={materials.error}/>
	);
}
