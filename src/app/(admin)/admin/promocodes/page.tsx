import { getPromocodes } from '@/shared/api/admin/promocode'
import PromocodeProvider from '@/shared/context/promocode-context'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { PromoPrimaryButtons } from '@/shared/shadcnui/promo-primary-buttons'
import { PromoDialogs } from '@/shared/shadcnui/promo-table/dialogs/promo-dialogs'
import { columns } from '@/shared/shadcnui/promo-table/promo-columns'
import { PromoTable } from '@/shared/shadcnui/promo-table/promo-table'
import { ValidatePromocodeSchema } from '@/shared/types/validation/promocode'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Промокоды"
};


export default async function AdminPromocodesPage() {
		const promoData = await getPromocodes()
		const data = ValidatePromocodeSchema.parse(promoData.success)
		return(
				<>
					{promoData.error === null ? 
						<PromocodeProvider>
									<Main>
										<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
												<div>
															<h2 className='text-2xl font-bold tracking-tight'>
																Промокоды
															</h2>
															<p className='text-muted-foreground'>
																Управление промокодами.
															</p>
												</div>
										<PromoPrimaryButtons/>
										</div>
										<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
												<PromoTable data={data} columns={columns}/>
										</div>
									</Main>
									<PromoDialogs/>
						</PromocodeProvider>
					: <ErrorTemplate/>}
					</>
		)	
}