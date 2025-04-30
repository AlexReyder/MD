import { getContent } from '@/shared/api/admin/rich-editor'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { RichEditor } from '@/shared/shadcnui/rich-editor/RichEditor'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Рекламная строка"
};

export default  async function AdminDeliveryPage() {
	const contentData = await getContent("adLineInfo", "adLine")
	return(
			<>
				{contentData.error === null ? 
								(<Main className=''>
									<div className='mb-2 flex flex-wrap items-center justify-between space-y-2 px-4'>
											<div>
												<h2 className='text-2xl font-bold tracking-tight'>
													Рекламная строка
												</h2>
												<p className='text-muted-foreground'>
														Информация, отображаемая в строке над шапкой.
												</p>
												</div>
									</div>
									<RichEditor content={contentData.success?.json} db={"adLineInfo"} name='adLine'/>
								</Main>)
				 : 
				 <ErrorTemplate/>
				 } 
			</>
	)
}