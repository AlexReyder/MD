import { getAds } from '@/shared/api/admin/ad'
import AdProvider from '@/shared/context/ad-context'
import { AdPrimaryButtons } from '@/shared/shadcnui/ad-primary-buttons'
import { columns } from '@/shared/shadcnui/ad-table/ad-columns'
import { AdTable } from '@/shared/shadcnui/ad-table/ad-table'
import { AdDialogs } from '@/shared/shadcnui/ad-table/dialogs/ad-dialogs'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { AdListSchema } from '@/shared/types/schemas'

export default async function AdminAdsPage() {
	const faqData = await getAds()
	const data = AdListSchema.parse(faqData.success)
	return(
			<>
				{faqData.error === null ? 
					<AdProvider>
								<Main>
									<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
											<div>
														<h2 className='text-2xl font-bold tracking-tight'>
															Баннеры
														</h2>
														<p className='text-muted-foreground'>
															Управление баннером главной страницы.
														</p>
											</div>
									<AdPrimaryButtons/>
									</div>
									<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
											<AdTable data={data} columns={columns}/>
									</div>
								</Main>
								<AdDialogs/>
					</AdProvider>
				: <ErrorTemplate/>}
				</>
	)
}