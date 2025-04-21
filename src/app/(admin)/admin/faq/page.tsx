import { getFAQs } from '@/shared/api/admin/faq'
import FAQProvider from '@/shared/context/faq-context'
import { FAQPrimaryButtons } from '@/shared/shadcnui/faq-primary-buttons'
import { FAQDialogs } from '@/shared/shadcnui/faq-table/dialogs/faq-dialogs'
import { columns } from '@/shared/shadcnui/faq-table/faq-columns'
import { FAQTable } from '@/shared/shadcnui/faq-table/faq-table'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { FAQListSchema } from '@/shared/types/schemas'

export default async function AdminFAQPage() {
	const faqData = await getFAQs()
	const data = FAQListSchema.parse(faqData.success)
	return(
			<>
				{faqData.error === null ? 
					<FAQProvider>
								<Main>
									<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
											<div>
														<h2 className='text-2xl font-bold tracking-tight'>
															Ответы на вопросы
														</h2>
														<p className='text-muted-foreground'>
															Управление ответами на вопросы.
														</p>
											</div>
									<FAQPrimaryButtons/>
									</div>
									<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
											<FAQTable data={data} columns={columns}/>
									</div>
								</Main>
								<FAQDialogs/>
					</FAQProvider>
				: <ErrorTemplate/>}
				</>
	)
}