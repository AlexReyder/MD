import { getAllSpecifications } from '@/shared/api/admin/specifications'
import { SpecPageTemplate } from '@/shared/shadcnui/layouts/spec-page-template'
import { columns } from '@/shared/shadcnui/specification-table/specification-columns'
import { specificationListSchema } from '@/shared/types/schemas'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Принты"
};

export default async function AdminSpecPrintPage() {
	const print = await getAllSpecifications('print')
	const data = specificationListSchema.parse(print.success)
	return (
		<SpecPageTemplate 
						title='Список принтов' 
						subtitle='Управление принтами.' 
						data={data} 
						columns={columns} 
						specType='print' 
						error={print.error}
			/>		
	);
}
