import { getNotifies } from '@/shared/api/admin/notify'
import NotifyProvider from '@/shared/context/notify-context'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { NotifyDialogs } from '@/shared/shadcnui/notify-table/dialogs/notify-dialogs'
import { columns } from '@/shared/shadcnui/notify-table/notify-columns'
import { NotifyTable } from '@/shared/shadcnui/notify-table/notify-table'
import { ValidateNotifyProductsSchema } from '@/shared/types/validation/notify-products'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Уведомления"
};

export default async function AdminNotifyPage() {
		const notifiesData = await getNotifies()
		const data = ValidateNotifyProductsSchema.parse(notifiesData.success)
		return(
				<>
					{notifiesData.error === null ? 
						<NotifyProvider>
									<Main>
										<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
												<div>
															<h2 className='text-2xl font-bold tracking-tight'>
																Уведомления о просьбах поставки
															</h2>
															<p className='text-muted-foreground'>
																Управление уведомлениями о просьбах поставки и отправка уведомлений клиентам на электронную почту.
															</p>
												</div>
										</div>
										<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
												<NotifyTable data={data} columns={columns}/>
										</div>
									</Main>
									<NotifyDialogs/>
						</NotifyProvider>
					: <ErrorTemplate/>}
					</>
		)	
}