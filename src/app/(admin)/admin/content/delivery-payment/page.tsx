import { getContent } from '@/shared/api/admin/rich-editor'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { RichEditor } from '@/shared/shadcnui/rich-editor/RichEditor'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Доставка/Оплата"
};

export default  async function AdminDeliveryPage() {
	const contentData = await getContent("deliveryInfo", "delivery")
	return(
			<>
				{contentData.error === null ? 
								(<Main className='h-full'>
									<div className='mb-2 flex flex-wrap items-center justify-between space-y-2 px-4'>
											<div>
												<h2 className='text-2xl font-bold tracking-tight'>
													Доставка / Оплата
												</h2>
												<p className='text-muted-foreground'>
														Информация об условиях оплаты и доставки.
												</p>
												</div>
									</div>
									<RichEditor content={contentData.success.json} db={"deliveryInfo"} name='delivery'/>
								</Main>)
				 : 
				 <ErrorTemplate/>
				 } 
			</>
	)
}